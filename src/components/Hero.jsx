import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { MODELS, PAYMENT_METHODS, PRICING_PLANS, getTelegramUrl } from "../config/siteConfig";
import { fadeUp, stagger } from "./motion";
import { ArrowRightIcon, CheckIcon, TelegramIcon } from "./icons";
import HeroShowcase from "./HeroShowcase";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

function FloatingCard({ className, delay = 0, duration = 6, children }) {
  return (
    <motion.div
      className={`hero-float ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: [0, -14, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay },
        y: { duration, delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: MODELS.length, suffix: "+", label: "Modelos" },
  { value: PRICING_PLANS.length - 1, suffix: "", label: "Grupos VIP" },
  { value: PAYMENT_METHODS.length, suffix: "", label: "Métodos de pago" },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const featured = PRICING_PLANS.find((plan) => plan.featured);

  return (
    <section ref={ref} id="inicio" className="hero">
      <div className="hero-top">
        <motion.div className="hero-content" initial="hidden" animate="show" variants={stagger(0.12, 0.1)}>
          <motion.span variants={fadeUp} className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Acceso inmediato • Contenido actualizado
          </motion.span>

          <motion.h1 variants={fadeUp} className="hero-title">
            Información de acceso a <span className="text-gradient">canales VIP</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-subtitle">
            Acceso inmediato • Contenido Actualizado • Los mejores PPV
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href="#promos" className="btn btn-primary">
              Ver planes
              <ArrowRightIcon className="btn-icon" />
            </a>
            <a
              href={getTelegramUrl("Hola bro, quiero información sobre los grupos VIP.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
            >
              <TelegramIcon className="btn-icon" />
              Enviar mensaje
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} className="hero-stats">
            {STATS.map((stat) => (
              <li key={stat.label} className="hero-stat">
                <span className="hero-stat-value">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="hero-visual" style={{ y: visualY }} aria-hidden="true">
          <div className="hero-orb" />

          <FloatingCard className="hero-float--plan" delay={0.3} duration={7}>
            <span className="pricing-badge hero-float-badge">{featured.badge}</span>
            <p className="hero-float-label">{featured.name}</p>
            <p className="hero-float-price">
              <span className="text-gradient">${featured.priceMxn}</span>
              <small>MXN</small>
            </p>
            <p className="hero-float-muted">o ${featured.priceUsd} USD</p>
          </FloatingCard>

          <FloatingCard className="hero-float--checks" delay={0.5} duration={8}>
            {["Contenido actualizado cada semana", "Un solo pago", "Acceso de por vida"].map((item) => (
              <p key={item} className="hero-float-check">
                <CheckIcon className="hero-float-check-icon" />
                {item}
              </p>
            ))}
          </FloatingCard>

          <FloatingCard className="hero-float--telegram" delay={0.7} duration={6.5}>
            <span className="hero-float-tg-icon">
              <TelegramIcon />
            </span>
            <span>
              <p className="hero-float-label">Telegram</p>
              <p className="hero-float-muted">Acceso inmediato a tu grupo</p>
            </span>
          </FloatingCard>
        </motion.div>
      </div>

      <HeroShowcase />
    </section>
  );
}
