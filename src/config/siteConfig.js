export const TELEGRAM_USER = "Rasputin1916GG";

export function getTelegramUrl(message) {
  return `https://t.me/${TELEGRAM_USER}?text=${encodeURIComponent(message)}`;
}

export const MODELS = [
  "Francesca Trisini", "mommysharonc", "Ennid Wong", "FridaItzel", "Sylunh", "Emilia Vizcarra",
  "Melisa Ruiz", "Yolany Gomez", "xoxlovelysweets", "Brenda Castro", "ivana banana", "ggval",
  "Neveska", "Gialover", "Yajana Cano", "Joselis Johana", "sunshine23_45", "ladydusha",
  "Adriana Olivarez", "Lela Sohna", "Gigardez", "Marta Maria Santos", "Maria Julissa", "Fehgalvao",
  "Whitebean", "lioqueen", "g88su", "lilmilk69", "Vanessa Bohorquez", "Whossooof", "Catsara",
  "Stefany Chavez", "Angie Beltran", "Marlene Santana", "Jessica Palacios", "Winnyluusoficial",
  "Alejandra Treviño",
];

export const REFERENCIAS = [
  { src: "https://cdn.imgchest.com/files/01485cc6d21d.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 1" },
  { src: "https://cdn.imgchest.com/files/169a73826184.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 2" },
  { src: "https://cdn.imgchest.com/files/ab10c31a508b.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 3" },
  { src: "https://cdn.imgchest.com/files/d54ebcc6af38.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 4" },
  { src: "https://cdn.imgchest.com/files/039f051c6b64.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 5" },
  { src: "https://cdn.imgchest.com/files/faf8f36659f8.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 6" },
  { src: "https://cdn.imgchest.com/files/6595940a451e.jpg", href: "https://t.me/refOfPremium", alt: "Referencia 7" },
];

export const PRUEBAS = [
  { src: "https://cdn.imgchest.com/files/fa01d802ce1d.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 1" },
  { src: "https://cdn.imgchest.com/files/f767f343707e.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 2" },
  { src: "https://cdn.imgchest.com/files/4c77b1f355e8.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 3" },
  { src: "https://cdn.imgchest.com/files/e656e72bdb07.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 4" },
  { src: "https://cdn.imgchest.com/files/6f1a505dcca5.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 5" },
  { src: "https://cdn.imgchest.com/files/18784e110313.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 6" },
  { src: "https://cdn.imgchest.com/files/365b32803f7a.jpg", href: "https://t.me/pruebaCont", alt: "Prueba 7" },
];

// Archivo de cdn.imgchest.com/files/ (incluye la extensión: .png, .jpg, .webp...)
const imgchest = (file) => `https://cdn.imgchest.com/files/${file}`;

export const SHOWCASE_IMAGES = {
  referencias: imgchest("54b72a65bd7c.png"),
  prueba: imgchest("f8fc833b2e56.png"),
  modelos: imgchest("e9e895b8e957.png"),
  planes: imgchest("22a852c54901.png"),
  telegram: imgchest("83f72fb098a3.png"),
  ofpremium: imgchest("254d5e47075b.png"),
  ofdeluxe: imgchest("ab4968a29806.png"),
  ambos: imgchest("3769059ffa8e.png"),
  pagoMexico: imgchest("455b494d30bf.png"),
  pagoInternacional: imgchest("4f5b48ee6e70.png"),
  unSoloPago: imgchest("775705bb3921.png"),
  contenidoNuevo: imgchest("328c3c4a1b6b.png"),
  cambios: imgchest("6de49dccbb9b.png"),
  todoTelegram: imgchest("9d591fe72bed.png"),
  preguntaModelo: imgchest("6484d55842a5.jpg"),
};

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
