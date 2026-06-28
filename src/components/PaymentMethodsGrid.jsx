import { PAYMENT_METHODS } from "../config/siteConfig";

export default function PaymentMethodsGrid({ onSelect }) {
  return (
    <div className="payment-methods-section">
      <div className="payment-methods-grid">
        {PAYMENT_METHODS.map((metodo) => (
          <button
            key={metodo.id}
            type="button"
            className="payment-method-card liquid-glass-inner"
            onClick={() => onSelect(metodo.id)}
          >
            <span className="payment-method-icon" aria-hidden="true">
              {metodo.icon}
            </span>
            <h3 className="payment-method-name">{metodo.nombre}</h3>
            <p className="payment-method-desc">{metodo.descripcion}</p>
            <span className="payment-method-hint">Ver detalles</span>
          </button>
        ))}
      </div>
    </div>
  );
}
