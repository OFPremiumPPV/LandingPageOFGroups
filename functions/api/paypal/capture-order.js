/**
 * Cloudflare Pages Function: captura una orden aprobada en PayPal.
 * Así el pago se completa y aparece en la actividad de la cuenta Business.
 * El frontend solo considera éxito cuando recibe { success: true }.
 * Para registrar pagos en BD o logs, añadir aquí después de captureOrder().
 * Variables de entorno: PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE (opcional)
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

async function captureOrder(accessToken, orderId, apiBase) {
  const res = await fetch(`${apiBase}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PayPal capture: ${res.status} ${err}`);
  }
  return res.json();
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
  const orderId = body.orderId || body.orderID;
  if (!orderId) {
    return jsonResponse({ error: "Falta orderId" }, 400);
  }

  try {
    const token = await getPayPalAccessToken(
      PAYPAL_CLIENT_ID,
      PAYPAL_SECRET,
      apiBase
    );
    const result = await captureOrder(token, orderId, apiBase);
    // Respuesta explícita success: true para que el frontend registre el pago correctamente
    return jsonResponse({ success: true, orderId, details: result });
  } catch (err) {
    console.error(err);
    return jsonResponse(
      { error: err.message || "Error al capturar el pago" },
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
