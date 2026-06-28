import { PRICING_PLANS, getTelegramUrl } from "../config/siteConfig";

function CheckIcon() {
  return (
    <svg
      className="pricing-feature-icon"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function PricingPlans() {
  return (
    <div className="pricing-section">
      <header className="pricing-header">
        <h2 className="pricing-title">Costo de acceso</h2>
        <p className="pricing-subtitle">
          Elige el plan que mejor se adapte a ti. Precios en pesos mexicanos y
          dólares americanos.
        </p>
      </header>

      <div className="pricing-grid">
        {PRICING_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`pricing-card liquid-glass-inner${plan.featured ? " pricing-card--featured" : ""}`}
          >
            {plan.badge && (
              <span className="pricing-badge">{plan.badge}</span>
            )}

            <h3 className="pricing-plan-name">{plan.name}</h3>

            <div className="pricing-amount">
              <span className="pricing-price">${plan.priceMxn}</span>
              <span className="pricing-currency">MXN</span>
            </div>
            <p className="pricing-usd">o ${plan.priceUsd} USD</p>

            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature} className="pricing-feature">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={getTelegramUrl(plan.telegramMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`pricing-cta${plan.featured ? " pricing-cta--primary" : ""}`}
            >
              Obtener acceso
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
