import { MODELS } from "../config/siteConfig";

export default function ModelsMarquee() {
  const items = [...MODELS, ...MODELS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className="marquee-item">
            <span className="marquee-item-dot" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
