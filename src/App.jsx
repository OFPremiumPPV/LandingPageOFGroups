import { useState } from "react";
import { createPortal } from "react-dom";
import { MotionConfig } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ModelsMarquee from "./components/ModelsMarquee";
import Section from "./components/Section";
import PhotoCarousel from "./components/PhotoCarousel";
import ModelsGrid from "./components/ModelsGrid";
import PricingPlans from "./components/PricingPlans";
import PaymentMethodsGrid from "./components/PaymentMethodsGrid";
import PaymentModal from "./components/PaymentModal";
import TelegramContact from "./components/TelegramContact";
import FAQSection from "./components/FAQSection";
import { Aurora, FinalCTA, FloatingTelegram, Footer, ScrollProgress } from "./components/SiteChrome";
import { PRUEBAS, REFERENCIAS } from "./config/siteConfig";

export default function App() {
  const [paymentModal, setPaymentModal] = useState(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen relative">
        <Aurora />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <ModelsMarquee />

          <Section
            id="referencias"
            eyebrow="Confianza"
            title="Referencias"
            subtitle="Desliza o usa las flechas. Toca cualquier imagen para verla en grande."
          >
            <PhotoCarousel items={REFERENCIAS} />
          </Section>

          <Section
            id="prueba"
            eyebrow="Muestra"
            title="Prueba de contenido"
            subtitle="Un vistazo al tipo de contenido que encontrarás dentro de los grupos."
          >
            <PhotoCarousel items={PRUEBAS} />
          </Section>

          <Section
            id="modelos"
            eyebrow="Catálogo"
            title="Modelos disponibles"
            subtitle="Las principales y las que más preguntan. ¿Buscas a alguien en especial? Usa el buscador."
          >
            <ModelsGrid />
          </Section>

          <Section
            id="promos"
            eyebrow="Precios"
            title="Costo de acceso"
            subtitle="Elige el plan que mejor se adapte a ti. Precios en pesos mexicanos y dólares americanos."
          >
            <PricingPlans />
          </Section>

          <Section
            id="pagos"
            eyebrow="Pagos"
            title="Métodos de pago"
            subtitle="Aceptamos múltiples formas de pago, tanto en México como internacionalmente. Haz clic en un método para ver los detalles."
          >
            <PaymentMethodsGrid onSelect={setPaymentModal} />
          </Section>

          <Section
            id="mensaje"
            eyebrow="Comprobante de pago"
            title="Mensaje por Telegram"
            subtitle="Atención personalizada, información de los grupos y envío de comprobante de pago."
          >
            <TelegramContact />
          </Section>

          <Section
            id="faq"
            eyebrow="Dudas"
            title="Preguntas frecuentes"
            subtitle="Resolvemos las dudas más comunes sobre nuestros grupos y acceso."
          >
            <FAQSection />
          </Section>

          <FinalCTA />
        </main>

        <Footer />
        <FloatingTelegram />

        {paymentModal &&
          createPortal(
            <PaymentModal type={paymentModal} onClose={() => setPaymentModal(null)} />,
            document.body
          )}
      </div>
    </MotionConfig>
  );
}
