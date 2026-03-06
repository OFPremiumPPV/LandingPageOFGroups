/**
 * Configuración de métodos de pago.
 * PayPal: el Client ID puede sobreescribirse con VITE_PAYPAL_CLIENT_ID en .env.
 * El Secret de PayPal solo debe usarse en tu backend (nunca en el frontend).
 */

export const paymentConfig = {
  paypal: {
    clientId:
      import.meta.env.VITE_PAYPAL_CLIENT_ID ||
      "AaMwGMAP82m7VPis9nZLncVWttMjxHhFDcfwDbqQ8Qc0fE8CIHQDwFrKwLSDq23loxLgEEm3WLO63_Vv",
    createOrderUrl:
      import.meta.env.VITE_PAYPAL_CREATE_ORDER_URL || "/api/paypal/create-order",
    captureOrderUrl:
      import.meta.env.VITE_PAYPAL_CAPTURE_ORDER_URL || "/api/paypal/capture-order",
    defaultAmount: "299",
    defaultCurrency: "MXN",
  },

  transferencia: {
    banco: "BBVA",
    clabe: "012180015321677206",
    cuenta: "1532167720",
    tarjeta: "4152314335428838",
    beneficiario: "Juan Santiago",
    referencia: "OF Premium-TuNombre",
  },

  oxxo: {
    tarjeta: "4152314335428838",
    instrucciones:
      "Acude a cualquier OXXO, indica que es depósito a cuenta de débito BBVA y proporciona el número. Después envía el comprobante (foto) por Telegram.",
  },
};
