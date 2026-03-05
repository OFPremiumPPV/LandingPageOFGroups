# Backend PayPal – Pasos en Cloudflare

El backend ya está en el proyecto: la función en `functions/api/paypal/create-order.js` crea la orden en PayPal. Solo tienes que configurar las variables de entorno en Cloudflare.

---

## 1. Entra a tu proyecto en Cloudflare

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages** → abre el proyecto de la landing (LandingPageOFGroups o el nombre que tenga).

---

## 2. Añade las variables de entorno del backend

1. Pestaña **Settings**.
2. En el menú lateral, **Environment variables**.
3. Pulsa **Add variable** (o **Add**).

Añade estas variables **para el entorno Production** (y, si quieres, también para Preview):

| Nombre              | Valor                    | Descripción |
|---------------------|--------------------------|-------------|
| `PAYPAL_CLIENT_ID`  | Tu Client ID de PayPal   | El mismo que usas en el frontend (Sandbox para pruebas). |
| `PAYPAL_SECRET`     | Tu Secret de PayPal      | **Solo** el de Sandbox para pruebas. Nunca lo pongas en el frontend. |

- **PAYPAL_CLIENT_ID:** en [developer.paypal.com](https://developer.paypal.com) → Apps & Credentials → tu app “WebGruposOF” → Client ID (copia).
- **PAYPAL_SECRET:** en la misma pantalla → “Secret” → “Show” → copia.

Opcional (solo cuando pases a producción):

| Nombre              | Valor                                   | Cuándo |
|---------------------|-----------------------------------------|--------|
| `PAYPAL_API_BASE`   | `https://api-m.paypal.com`              | Solo cuando quieras **pagos reales**. Si no la pones, se usa Sandbox (`https://api-m.sandbox.paypal.com`). |

Guarda los cambios.

---

## 3. Vuelve a desplegar

1. Pestaña **Deployments**.
2. En el último deployment, menú (tres puntos) → **Retry deployment**, o haz un **nuevo push a la rama `main`** en Git para que Cloudflare genere un deploy nuevo.

Así la función usará las nuevas variables.

---

## 4. Probar

1. Abre tu landing desplegada en Cloudflare.
2. Métodos de pago → **PayPal**.
3. Deberían aparecer los botones de PayPal; al hacer clic se crea la orden en Sandbox y se abre el flujo de pago de prueba.
4. Usa una **cuenta Personal de Sandbox** (la creas en developer.paypal.com → Sandbox → Accounts) para simular el pago.

---

## Resumen

- **Sandbox (pruebas):** Solo necesitas `PAYPAL_CLIENT_ID` y `PAYPAL_SECRET` de Sandbox. No pongas `PAYPAL_API_BASE`.
- **Producción (pagos reales):** Cambia a credenciales **Live** en el dashboard de PayPal, pon en Cloudflare el Client ID y Secret de Live y añade `PAYPAL_API_BASE` = `https://api-m.paypal.com`.
