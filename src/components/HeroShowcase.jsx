import { motion } from "framer-motion";
import {
  MODELS,
  PRICING_PLANS,
  PRUEBAS,
  REFERENCIAS,
  SHOWCASE_IMAGES,
  getTelegramUrl,
} from "../config/siteConfig";
import { fadeUp, stagger } from "./motion";

const minPrice = Math.min(...PRICING_PLANS.map((plan) => plan.priceMxn));

const ROWS = [
  [
    {
      href: "#referencias",
      eyebrow: "Confianza",
      title: "Referencias",
      detail: `${REFERENCIAS.length} referencias para revisar`,
      image: SHOWCASE_IMAGES.referencias,
    },
    {
      href: "#prueba",
      eyebrow: "Muestra",
      title: "Prueba de contenido",
      detail: `${PRUEBAS.length} imágenes de prueba`,
      image: SHOWCASE_IMAGES.prueba,
    },
    {
      href: "#modelos",
      eyebrow: "Catálogo",
      title: "Modelos",
      detail: `${MODELS.length}+ modelos disponibles`,
      image: SHOWCASE_IMAGES.modelos,
    },
    {
      href: "#promos",
      eyebrow: "Precios",
      title: "Planes de acceso",
      detail: `Desde $${minPrice} MXN`,
      image: SHOWCASE_IMAGES.planes,
    },
    {
      href: "#mensaje",
      eyebrow: "Contacto",
      title: "Telegram",
      detail: "Atención personalizada",
      image: SHOWCASE_IMAGES.telegram,
    },
  ],
  [
    ...PRICING_PLANS.map((plan) => ({
      href: getTelegramUrl(plan.telegramMessage),
      external: true,
      eyebrow: plan.badge ?? "Plan",
      title: plan.name,
      detail: `$${plan.priceMxn} MXN o $${plan.priceUsd} USD`,
      image: SHOWCASE_IMAGES[plan.id],
    })),
    {
      href: "#pagos",
      eyebrow: "Pago en México",
      title: "Transferencia y OXXO",
      detail: "SPEI o depósito en efectivo",
      image: SHOWCASE_IMAGES.pagoMexico,
    },
    {
      href: "#pagos",
      eyebrow: "Pago internacional",
      title: "PayPal, Felix Pago y Remitly",
      detail: "Paga desde cualquier país",
      image: SHOWCASE_IMAGES.pagoInternacional,
    },
  ],
  [
    {
      href: "#faq",
      eyebrow: "Sin mensualidades",
      title: "Un solo pago",
      detail: "Acceso de por vida",
      image: SHOWCASE_IMAGES.unSoloPago,
    },
    {
      href: "#faq",
      eyebrow: "Actualizaciones",
      title: "Contenido nuevo",
      detail: "Se actualiza cada fin de semana",
      image: SHOWCASE_IMAGES.contenidoNuevo,
    },
    {
      href: "#faq",
      eyebrow: "Cambios",
      title: "¿Haces cambios?",
      detail: "Sí, si el contenido es de interés",
      image: SHOWCASE_IMAGES.cambios,
    },
    {
      href: "#faq",
      eyebrow: "Plataforma",
      title: "Todo en Telegram",
      detail: "Ambos grupos están en Telegram",
      image: SHOWCASE_IMAGES.todoTelegram,
    },
    {
      href: "#modelos",
      eyebrow: "¿Buscas a alguien?",
      title: "Pregunta por tu modelo",
      detail: "Búscala en la lista o escríbenos",
      image: SHOWCASE_IMAGES.preguntaModelo,
    },
  ],
];

function ShowcaseCard({ card }) {
  return (
    <motion.a
      href={card.href}
      target={card.external ? "_blank" : undefined}
      rel={card.external ? "noopener noreferrer" : undefined}
      variants={fadeUp}
      className="showcase-card"
    >
      <img src={card.image} alt="" className="showcase-image" loading="lazy" />
      <span className="showcase-shade" aria-hidden="true" />
      <span className="showcase-caption">
        <span className="showcase-eyebrow">{card.eyebrow}</span>
        <span className="showcase-title">{card.title}</span>
        <span className="showcase-detail">{card.detail}</span>
      </span>
    </motion.a>
  );
}

export default function HeroShowcase() {
  return (
    <div className="showcase-group">
      {ROWS.map((row, i) => (
        <motion.div
          key={i}
          className="showcase"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger(0.08, i === 0 ? 0.6 : 0)}
        >
          {row.map((card) => (
            <ShowcaseCard key={card.title} card={card} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
