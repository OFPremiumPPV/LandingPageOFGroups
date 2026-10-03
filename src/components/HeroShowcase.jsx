import { motion } from "framer-motion";
import { MODELS, PRICING_PLANS, PRUEBAS, REFERENCIAS, getTelegramUrl } from "../config/siteConfig";
import { fadeUp, stagger } from "./motion";

const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?w=700&q=75&auto=format&fit=crop`;

const minPrice = Math.min(...PRICING_PLANS.map((plan) => plan.priceMxn));

const PLAN_IMAGES = {
  ofpremium: unsplash("1557682250-33bd709cbe85"),
  ofdeluxe: unsplash("1541701494587-cb58502866ab"),
  ambos: unsplash("1618172193763-c511deb635ca"),
};

const ROWS = [
  [
    {
      href: "#referencias",
      eyebrow: "Confianza",
      title: "Referencias",
      detail: `${REFERENCIAS.length} referencias para revisar`,
      image: unsplash("1618005182384-a83a8bd57fbe"),
    },
    {
      href: "#prueba",
      eyebrow: "Muestra",
      title: "Prueba de contenido",
      detail: `${PRUEBAS.length} imágenes de prueba`,
      image: unsplash("1557672172-298e090bd0f1"),
    },
    {
      href: "#modelos",
      eyebrow: "Catálogo",
      title: "Modelos",
      detail: `${MODELS.length}+ modelos disponibles`,
      image: unsplash("1634017839464-5c339ebe3cb4"),
    },
    {
      href: "#promos",
      eyebrow: "Precios",
      title: "Planes de acceso",
      detail: `Desde $${minPrice} MXN`,
      image: unsplash("1620641788421-7a1c342ea42e"),
    },
    {
      href: "#mensaje",
      eyebrow: "Contacto",
      title: "Telegram",
      detail: "Atención personalizada",
      image: unsplash("1604079628040-94301bb21b91"),
    },
  ],
  [
    ...PRICING_PLANS.map((plan) => ({
      href: getTelegramUrl(plan.telegramMessage),
      external: true,
      eyebrow: plan.badge ?? "Plan",
      title: plan.name,
      detail: `$${plan.priceMxn} MXN o $${plan.priceUsd} USD`,
      image: PLAN_IMAGES[plan.id],
    })),
    {
      href: "#pagos",
      eyebrow: "Pago en México",
      title: "Transferencia y OXXO",
      detail: "SPEI o depósito en efectivo",
      image: unsplash("1557682224-5b8590cd9ec5"),
    },
    {
      href: "#pagos",
      eyebrow: "Pago internacional",
      title: "PayPal, Felix Pago y Remitly",
      detail: "Paga desde cualquier país",
      image: unsplash("1620121692029-d088224ddc74"),
    },
  ],
  [
    {
      href: "#faq",
      eyebrow: "Sin mensualidades",
      title: "Un solo pago",
      detail: "Acceso de por vida",
      image: unsplash("1618556450994-a6a128ef0d9d"),
    },
    {
      href: "#faq",
      eyebrow: "Actualizaciones",
      title: "Contenido nuevo",
      detail: "Se actualiza cada fin de semana",
      image: unsplash("1617791160505-6f00504e3519"),
    },
    {
      href: "#faq",
      eyebrow: "Cambios",
      title: "¿Haces cambios?",
      detail: "Sí, si el contenido es de interés",
      image: unsplash("1563089145-599997674d42"),
    },
    {
      href: "#faq",
      eyebrow: "Plataforma",
      title: "Todo en Telegram",
      detail: "Ambos grupos están en Telegram",
      image: unsplash("1614850523459-c2f4c699c52e"),
    },
    {
      href: "#modelos",
      eyebrow: "¿Buscas a alguien?",
      title: "Pregunta por tu modelo",
      detail: "Búscala en la lista o escríbenos",
      image: unsplash("1558591710-4b4a1ae0f04d"),
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
