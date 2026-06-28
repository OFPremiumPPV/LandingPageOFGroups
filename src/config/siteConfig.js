export const TELEGRAM_USER = "Rasputin1916GG";

export function getTelegramUrl(message) {
  return `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(message)}`;
}

export const PAYMENT_METHODS = [
  {
    id: "transferencia",
    nombre: "Transferencia mexicana",
    descripcion: "SPEI / transferencia bancaria nacional",
    icon: "🏦",
    actionable: true,
  },
  {
    id: "oxxo",
    nombre: "Depósito en OXXO",
    descripcion: "Pago en efectivo en tiendas OXXO",
    icon: "🏪",
    actionable: true,
  },
  {
    id: "paypal",
    nombre: "PayPal",
    descripcion: "Pago internacional seguro",
    icon: "💳",
    actionable: true,
  },
  {
    id: "felix",
    nombre: "Felix Pago",
    descripcion: "Envíos rápidos desde USA",
    icon: "⚡",
    actionable: true,
  },
  {
    id: "remitly",
    nombre: "Remitly",
    descripcion: "Transferencias internacionales",
    icon: "🌎",
    actionable: true,
  },
];

export const PRICING_PLANS = [
  {
    id: "ofpremium",
    name: "Grupo OFPremium",
    priceMxn: 300,
    priceUsd: 19,
    features: [
      "Acceso al grupo premium",
      "Contenido exclusivo cada semana",
      "Actualizaciones constantes",
    ],
    featured: false,
    telegramMessage:
      "Hola bro, me interesa el grupo OF Premium de 300 pesos mexicanos o 19 dolares.",
  },
  {
    id: "ofdeluxe",
    name: "Grupo OFDeluxe",
    priceMxn: 600,
    priceUsd: 37,
    features: [
      "Acceso al grupo deluxe",
      "Contenido premium + exclusivo",
      "Material de mayor calidad",
    ],
    featured: true,
    badge: "Más popular",
    telegramMessage:
      "Hola bro, me interesa el grupo OF Deluxe de 600 pesos mexicanos o 37 dolares.",
  },
  {
    id: "ambos",
    name: "Acceso a ambos grupos",
    priceMxn: 700,
    priceUsd: 42,
    features: [
      "OFPremium + OFDeluxe incluidos",
      "Mejor precio por acceso completo",
      "Todo el catálogo disponible",
    ],
    featured: false,
    telegramMessage:
      "Hola bro, me interesa el acceso a ambos grupos (OFPremium + OFDeluxe) de 700 pesos mexicanos o 42 dolares.",
  },
];

export const FAQS = [
  {
    id: "diferencia-grupos",
    pregunta: "¿Cuál es la diferencia de ambos grupos?",
    respuesta:
      "En el grupo OFDeluxe únicamente se sube contenido de pago (el que las creadoras venden por mensaje privado) y el grupo OFPremium tiene contenido variado (contenido del feed de su perfil de OF y algunos videos de pago).",
  },
  {
    id: "solo-pago",
    pregunta: "¿Es un solo pago?",
    respuesta: "Sí, es un solo pago y acceso de por vida.",
  },
  {
    id: "metodos-pago",
    pregunta: "¿Qué métodos de pago aceptas?",
    respuesta: "Transferencia mexicana, depósito en OXXO, PayPal, Felix Pago y Remitly.",
  },
  {
    id: "cambios",
    pregunta: "¿Haces cambios?",
    respuesta:
      "Sí, si el contenido es de mi interés. Manda mensaje y dime qué no quieres comprar, que solo te interesa cambiar. Ej. Te interesaría cambiar contenido de Francesca Trisini por contenido de Yolany Gómez.",
  },
  {
    id: "grupo-gratis",
    pregunta: "¿Hay un grupo gratis?",
    respuesta:
      "No, lo intentamos pero Telegram cierra los canales porque los reportan.",
  },
  {
    id: "modelos-grupos",
    pregunta: "¿Qué modelos hay en los grupos?",
    respuesta:
      "En la sección prueba de contenido y modelos puedes ver una lista de las principales, de las que más preguntan. Si te interesa saber si tenemos contenido de una modelo en especial, pregunta directamente. Ej. ¿En tu grupo hay contenido de Francesca Trisini?",
  },
  {
    id: "plataforma-grupos",
    pregunta: "¿En qué plataforma o página están los grupos?",
    respuesta: "En Telegram están ambos grupos.",
  },
  {
    id: "actualizaciones",
    pregunta: "¿Cada cuánto se actualiza el contenido?",
    respuesta: "El contenido se actualiza cada fin de semana.",
  },
];
