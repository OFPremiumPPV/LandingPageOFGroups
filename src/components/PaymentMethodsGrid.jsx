import { motion } from "framer-motion";
import { PAYMENT_METHODS } from "../config/siteConfig";
import { fadeUp, stagger } from "./motion";

export default function PaymentMethodsGrid({ onSelect }) {
  return (
    <motion.div className="payment-methods-grid" variants={stagger(0.08)}>
      {PAYMENT_METHODS.map((metodo) => (
        <motion.button
          key={metodo.id}
          type="button"
          variants={fadeUp}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="payment-method-card liquid-glass-inner"
          onClick={() => onSelect(metodo.id)}
        >
          <span className="payment-method-icon" aria-hidden="true">
            {metodo.icon}
          </span>
          <h3 className="payment-method-name">{metodo.nombre}</h3>
          <p className="payment-method-desc">{metodo.descripcion}</p>
          <span className="payment-method-hint">Ver detalles →</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
