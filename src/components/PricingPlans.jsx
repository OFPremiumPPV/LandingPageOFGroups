import { motion } from "framer-motion";
import { PRICING_PLANS, getTelegramUrl } from "../config/siteConfig";
import { fadeUp, stagger } from "./motion";
import { CheckIcon } from "./icons";

export default function PricingPlans() {
  return (
    <motion.div className="pricing-grid" variants={stagger(0.12)}>
      {PRICING_PLANS.map((plan) => (
        <motion.article
          key={plan.id}
          variants={fadeUp}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={`pricing-card liquid-glass-inner${plan.featured ? " pricing-card--featured" : ""}`}
        >
          {plan.badge && <span className="pricing-badge">{plan.badge}</span>}

          <h3 className="pricing-plan-name">{plan.name}</h3>

          <div className="pricing-amount">
            <span className="pricing-price">${plan.priceMxn}</span>
            <span className="pricing-currency">MXN</span>
          </div>
          <p className="pricing-usd">o ${plan.priceUsd} USD</p>

          <ul className="pricing-features">
            {plan.features.map((feature) => (
              <li key={feature} className="pricing-feature">
                <CheckIcon className="pricing-feature-icon" />
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
        </motion.article>
      ))}
    </motion.div>
  );
}
