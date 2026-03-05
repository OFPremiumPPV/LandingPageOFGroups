import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * items: array of { src, href?, alt? }
 * Click on image opens zoom lightbox (no redirect).
 */
export default function PhotoCarousel({ items = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(null);
  const total = items.length;
  const goPrev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));
  const goNext = () => setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  if (!items.length) return null;

  const getOffset = (index) => {
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    if (Math.abs(diff) > 2) return null;
    return diff;
  };

  const openZoom = (item) => setZoomImage(item);
  const closeZoom = () => setZoomImage(null);

  return (
    <div className="photo-carousel-wrapper">
      {title && (
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          {title}
        </h3>
      )}
      <div className="photo-carousel-container">
        <button
          type="button"
          onClick={goPrev}
          className="photo-carousel-arrow photo-carousel-arrow-left"
          aria-label="Anterior"
        >
          ‹
        </button>

        <div className="photo-carousel-stage">
          {items.map((item, index) => {
            const offset = getOffset(index);
            if (offset === null) return null;
            return (
              <motion.button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => openZoom(item)}
                className="photo-carousel-card photo-carousel-card-button"
                initial={false}
                animate={{
                  x: offset * 72,
                  scale: 1 - Math.abs(offset) * 0.12,
                  zIndex: 10 - Math.abs(offset),
                  opacity: Math.abs(offset) === 2 ? 0.6 : 1,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div className="photo-carousel-card-inner">
                  <img
                    src={item.src}
                    alt={item.alt || `Slide ${index + 1}`}
                    className="photo-carousel-image"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="photo-carousel-arrow photo-carousel-arrow-right"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      {total > 1 && (
        <div className="photo-carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`photo-carousel-dot ${i === currentIndex ? "active" : ""}`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox zoom */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            className="photo-carousel-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeZoom}
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada"
          >
            <button
              type="button"
              className="photo-carousel-lightbox-close"
              onClick={closeZoom}
              aria-label="Cerrar"
            >
              ×
            </button>
            <motion.div
              className="photo-carousel-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={zoomImage.src}
                alt={zoomImage.alt || "Vista ampliada"}
                className="photo-carousel-lightbox-image"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
