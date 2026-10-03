import { motion, useScroll, useSpring } from "framer-motion";
import { getTelegramUrl } from "../config/siteConfig";
import { fadeUp, stagger } from "./motion";
import { ArrowRightIcon, TelegramIcon } from "./icons";

export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora-blob aurora-blob--1" />
      <span className="aurora-blob aurora-blob--2" />
      <span className="aurora-blob aurora-blob--3" />
      <span className="aurora-blob aurora-blob--4" />
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export function FloatingTelegram() {
  return (
    <motion.a
      href={getTelegramUrl("Hola bro, quiero información sobre los grupos VIP.")}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-telegram"
      aria-label="Contactar por Telegram"
      title="Contactar por Telegram"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <TelegramIcon />
    </motion.a>
  );
}

export function FinalCTA() {
  return (
    <motion.section
      className="final-cta"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(0.12)}
    >
      <motion.h2 variants={fadeUp} className="final-cta-title">
        ¿Listo para acceder?
      </motion.h2>
      <motion.p variants={fadeUp} className="final-cta-text">
        Realiza tu pago con el método de tu preferencia y contáctanos para recibir el acceso
        inmediato a tu grupo.
      </motion.p>
      <motion.div variants={fadeUp} className="final-cta-actions">
        <a href="#promos" className="btn btn-white">
          Ver planes de acceso
          <ArrowRightIcon className="btn-icon" />
        </a>
        <a
          href={getTelegramUrl("Hola bro, quiero información sobre los grupos VIP.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-white"
        >
          <TelegramIcon className="btn-icon" />
          Escribir por Telegram
        </a>
      </motion.div>
    </motion.section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer-brand">
        <span className="glass-nav-brand-icon" aria-hidden="true">✦</span>
        OF Premium / OF Deluxe
      </p>
      <nav className="site-footer-links" aria-label="Enlaces del pie de página">
        <a href="#promos">Precios</a>
        <a href="#pagos">Métodos de pago</a>
        <a href="#faq">FAQ</a>
      </nav>
      <p className="site-footer-copy">© {new Date().getFullYear()} OF Premium / OF Deluxe</p>
    </footer>
  );
}
