import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { paymentConfig } from "../config/paymentConfig";

const CopyField = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="payment-modal-field flex flex-col gap-1.5">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <div className="flex items-center gap-2 rounded-xl bg-white/40 px-3 py-2.5 backdrop-blur-sm">
        <code className="flex-1 truncate text-gray-800 text-base">{value}</code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
    </div>
  );
};

export default function PaymentModal({ type, onClose }) {
  const overlayRef = useRef(null);
  const paypalContainerRef = useRef(null);
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalError, setPaypalError] = useState(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    if (type) {
      document.body.classList.add("payment-modal-open");
      return () => document.body.classList.remove("payment-modal-open");
    }
  }, [type]);

  useEffect(() => {
    if (type !== "paypal") return;
    const { clientId, createOrderUrl, defaultAmount, defaultCurrency } = paymentConfig.paypal;
    if (!clientId) {
      setPaypalError("Falta configurar VITE_PAYPAL_CLIENT_ID en .env");
      return;
    }

    if (typeof window === "undefined") return;
    let cancelled = false;
    if (window.paypal) {
      setPaypalReady(true);
      const t = setTimeout(() => safeRenderButtons(), 0);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${defaultCurrency}&intent=capture`;
    script.async = true;
    script.onload = () => {
      if (cancelled) return;
      setPaypalReady(true);
      requestAnimationFrame(() => safeRenderButtons());
    };
    script.onerror = () => setPaypalError("No se pudo cargar PayPal.");
    document.body.appendChild(script);
    return () => {
      cancelled = true;
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [type]);

  function safeRenderButtons() {
    const container = paypalContainerRef.current;
    if (!window.paypal || !container || !document.body.contains(container)) return;
    renderButtons();
  }

  const renderButtons = () => {
    const container = paypalContainerRef.current;
    if (!window.paypal || !container || !document.body.contains(container)) return;
    container.innerHTML = "";
    const { createOrderUrl, captureOrderUrl, defaultAmount, defaultCurrency } =
      paymentConfig.paypal;

    if (!createOrderUrl) {
      setPaypalError(null);
      return;
    }

    const parseJsonResponse = async (r) => {
      const text = await r.text();
      if (!r.ok) {
        let msg = `Error ${r.status}`;
        if (r.status === 404) msg = "El servidor de pagos no está disponible (prueba en la versión desplegada).";
        else {
          try {
            const data = JSON.parse(text);
            if (data?.error) msg = data.error;
          } catch {
            if (text) msg = text.slice(0, 200);
          }
        }
        return Promise.reject(new Error(msg));
      }
      try {
        return text ? JSON.parse(text) : {};
      } catch {
        return Promise.reject(new Error("Respuesta inválida del servidor"));
      }
    };

    window.paypal
      .Buttons({
        style: { layout: "vertical", color: "blue", shape: "rect", label: "paypal" },
        createOrder: () =>
          fetch(createOrderUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: defaultAmount,
              currency: defaultCurrency,
            }),
          })
            .then(parseJsonResponse)
            .then((data) => {
              const id = data.orderId || data.id;
              if (!id || typeof id !== "string") {
                return Promise.reject(new Error(data?.error || "No se recibió orderId del servidor"));
              }
              return String(id).trim();
            }),
        onApprove: (data) => {
          const orderId = data.orderID || data.orderId;
          if (!orderId) {
            onClose();
            return;
          }
          fetch(captureOrderUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          })
            .then(parseJsonResponse)
            .then(() => onClose())
            .catch((err) => {
              setPaypalError(err?.message || "El pago se aprobó pero falló la confirmación. Contacta soporte.");
            });
        },
        onError: (err) => setPaypalError(err?.message || "Error en PayPal"),
      })
      .render(container);
  };

  useEffect(() => {
    if (
      type === "paypal" &&
      paypalReady &&
      window.paypal &&
      paymentConfig.paypal.createOrderUrl
    ) {
      safeRenderButtons();
    }
  }, [paypalReady]);

  const titles = {
    transferencia: "Transferencia Mexicana",
    oxxo: "Depósito en OXXO",
    paypal: "Pagar con PayPal",
  };
  const title = titles[type] || "Método de pago";

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        className="payment-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOverlayClick}
      >
        <motion.div
          className={`payment-modal-content${type === "transferencia" ? " payment-modal-content--transferencia" : ""}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="payment-modal-header flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="payment-modal-close"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          <div className={`payment-modal-body${type === "transferencia" ? " payment-modal-body--transferencia" : ""}`}>
          {type === "transferencia" && (
            <div className="space-y-4 pb-6">
              <CopyField label="Banco" value={paymentConfig.transferencia.banco} />
              <CopyField label="CLABE" value={paymentConfig.transferencia.clabe} />
              <CopyField label="Cuenta" value={paymentConfig.transferencia.cuenta} />
              <CopyField label="Número de tarjeta" value={paymentConfig.transferencia.tarjeta} />
              <CopyField label="Beneficiario" value={paymentConfig.transferencia.beneficiario} />
              <CopyField label="Referencia (opcional)" value={paymentConfig.transferencia.referencia} />
            </div>
          )}

          {type === "oxxo" && (
            <div className="space-y-4">
              <CopyField label="Número de tarjeta" value={paymentConfig.oxxo.tarjeta} />
              <p className="text-sm text-gray-600 rounded-xl bg-white/40 p-3 backdrop-blur-sm">
                {paymentConfig.oxxo.instrucciones}
              </p>
            </div>
          )}

          {type === "paypal" && (
            <div className="min-h-[180px]">
              {paypalError && (
                <p className="rounded-xl bg-amber-100/80 p-3 text-amber-900 text-sm mb-4">
                  {paypalError}
                </p>
              )}
              {!paymentConfig.paypal.createOrderUrl && paymentConfig.paypal.clientId && (
                <p className="rounded-xl bg-blue-50/80 p-3 text-blue-900 text-sm mb-4">
                  Para habilitar pagos, configura <code>VITE_PAYPAL_CREATE_ORDER_URL</code> en tu backend (crear orden en PayPal y devolver <code>orderId</code>).
                </p>
              )}
              <div ref={paypalContainerRef} className="flex justify-center" />
            </div>
          )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
