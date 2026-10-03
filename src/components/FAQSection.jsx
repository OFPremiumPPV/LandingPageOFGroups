import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS, getTelegramUrl } from "../config/siteConfig";
import { EASE_OUT, fadeUp, stagger } from "./motion";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`faq-chevron${open ? " faq-chevron--open" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(FAQS[0]?.id ?? null);

  return (
    <>
      <motion.div className="faq-list" variants={stagger(0.06)}>
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <motion.div
              key={faq.id}
              variants={fadeUp}
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

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    className="faq-answer-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    <div className="faq-answer">
                      <p>{faq.respuesta}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.p variants={fadeUp} className="faq-more">
        ¿No encontraste tu respuesta?{" "}
        <a
          href={getTelegramUrl("Hola bro, tengo una pregunta sobre los grupos.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Escríbenos por Telegram
        </a>
      </motion.p>
    </>
  );
}
