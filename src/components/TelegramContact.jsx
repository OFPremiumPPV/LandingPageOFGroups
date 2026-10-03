import { motion } from "framer-motion";
import { getTelegramUrl } from "../config/siteConfig";
import { fadeUp } from "./motion";
import { CheckIcon, TelegramIcon } from "./icons";

const PERKS = ["Atención personalizada", "Información de los grupos", "Envío de comprobante de pago"];

export default function TelegramContact() {
  return (
    <motion.div variants={fadeUp} className="telegram-contact">
      <span className="telegram-contact-icon">
        <TelegramIcon />
      </span>

      <ul className="telegram-contact-perks">
        {PERKS.map((perk) => (
          <li key={perk}>
            <CheckIcon className="telegram-contact-check" />
            {perk}
          </li>
        ))}
      </ul>

      <a
        href={getTelegramUrl("Hola bro, quiero información sobre los grupos VIP.")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-telegram"
      >
        <TelegramIcon className="btn-icon" />
        Enviar mensaje
      </a>
    </motion.div>
  );
}
