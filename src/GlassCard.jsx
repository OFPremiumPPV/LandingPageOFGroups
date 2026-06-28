import { motion } from "framer-motion";

export default function GlassCard({ children, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.6 }}
      className="glass-panel liquid-glass p-6 sm:p-8 md:p-10 max-w-5xl mx-auto my-12"
    >
      <div className="liquid-glass-shine" aria-hidden="true" />
      <div className="liquid-glass-edge" aria-hidden="true" />
      <div className="liquid-glass-content">{children}</div>
    </motion.section>
  );
}
