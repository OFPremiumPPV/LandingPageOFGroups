import { useState } from "react";
import { FAQS } from "../config/siteConfig";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`faq-chevron${open ? " faq-chevron--open" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(FAQS[0]?.id ?? null);

  return (
    <div className="faq-section">
      <header className="faq-header">
        <h2 className="faq-title">Preguntas frecuentes</h2>
        <p className="faq-subtitle">
          Resolvemos las dudas más comunes sobre nuestros grupos y acceso.
        </p>
      </header>

      <div className="faq-list">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`faq-item liquid-glass-inner${isOpen ? " faq-item--open" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="faq-question"
                aria-expanded={isOpen}
              >
                <span>{faq.pregunta}</span>
                <ChevronIcon open={isOpen} />
              </button>

              {isOpen && (
                <div className="faq-answer">
                  <p>{faq.respuesta}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
