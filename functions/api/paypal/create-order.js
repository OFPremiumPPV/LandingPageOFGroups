/**
 * Cloudflare Pages Function: crea una orden en PayPal y devuelve el orderId.
 * Variables de entorno en Cloudflare: PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE (opcional)
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

async function getPayPalAccessToken(clientId, secret, apiBase) {
  const auth = btoa(`${clientId}:${secret}`);
  const res = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal token: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function createPayPalOrder(accessToken, amount, currency, apiBase) {
  const res = await fetch(`${apiBase}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency || "MXN",
            value: String(amount || "299"),
          },
        },
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal create order: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.id;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE } = env;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
    return jsonResponse(
      { error: "Faltan PAYPAL_CLIENT_ID o PAYPAL_SECRET en el servidor" },
      500
    );
  }

  const apiBase = PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const amount = body.amount || "299";
  const currency = body.currency || "MXN";

  try {
    const token = await getPayPalAccessToken(
      PAYPAL_CLIENT_ID,
      PAYPAL_SECRET,
      apiBase
    );
    const orderId = await createPayPalOrder(token, amount, currency, apiBase);
    return jsonResponse({ orderId });
  } catch (err) {
    console.error(err);
    return jsonResponse(
      { error: err.message || "Error al crear la orden" },
      500
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Max-Age": "86400",
    },
  });
}
