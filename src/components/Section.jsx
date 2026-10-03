import { motion } from "framer-motion";
import { fadeUp, stagger } from "./motion";

export default function Section({ id, eyebrow, title, subtitle, children, className = "" }) {
  const hasHeader = eyebrow || title || subtitle;

  return (
    <motion.section
      id={id}
      className={`section-panel ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(0.1)}
    >
      <div className="liquid-glass-shine" aria-hidden="true" />
      <div className="liquid-glass-edge" aria-hidden="true" />

      <div className="liquid-glass-content">
        {hasHeader && (
          <header className="section-header">
            {eyebrow && (
              <motion.span variants={fadeUp} className="section-eyebrow">
                {eyebrow}
              </motion.span>
            )}
            {title && (
              <motion.h2 variants={fadeUp} className="section-title">
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p variants={fadeUp} className="section-subtitle">
                {subtitle}
              </motion.p>
            )}
          </header>
        )}

        <motion.div variants={stagger(0.06)}>{children}</motion.div>
      </div>
    </motion.section>
  );
}
