import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MODELS, getTelegramUrl } from "../config/siteConfig";
import { fadeUp } from "./motion";
import { SearchIcon } from "./icons";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #38bdf8, #6366f1)",
  "linear-gradient(135deg, #f472b6, #a855f7)",
  "linear-gradient(135deg, #fb923c, #f43f5e)",
  "linear-gradient(135deg, #34d399, #0ea5e9)",
  "linear-gradient(135deg, #818cf8, #ec4899)",
];

const normalize = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

function initials(name) {
  const parts = name.replace(/[^a-zA-ZÀ-ÿ\s]/g, " ").trim().split(/\s+/);
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  return letters.toUpperCase();
}

export default function ModelsGrid() {
  const [query, setQuery] = useState("");
  const filtered = MODELS.filter((name) => normalize(name).includes(normalize(query)));

  return (
    <motion.div variants={fadeUp}>
      <div className="models-toolbar">
        <label className="models-search">
          <SearchIcon className="models-search-icon" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar modelo..."
            aria-label="Buscar modelo"
          />
        </label>
        <span className="models-count">
          {filtered.length} de {MODELS.length} modelos
        </span>
      </div>

      <motion.ul layout className="models-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((name) => (
            <motion.li
              layout
              key={name}
              className="model-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
            >
              <span
                className="model-avatar"
                style={{ background: AVATAR_GRADIENTS[MODELS.indexOf(name) % AVATAR_GRADIENTS.length] }}
              >
                {initials(name)}
              </span>
              <span className="model-name" title={name}>
                {name}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <p className="models-empty">
          No encontramos a “{query}” en la lista principal.{" "}
          <a
            href={getTelegramUrl(`Hola bro, ¿en tu grupo hay contenido de ${query}?`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pregúntanos por Telegram
          </a>
        </p>
      )}
    </motion.div>
  );
}
