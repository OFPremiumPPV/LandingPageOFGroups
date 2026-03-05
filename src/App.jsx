import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import GlassCard from "./GlassCard";
import WebGLBackground from "./WebGLBackground";
import CustomCursor from "./components/CustomCursor";
import PhotoCarousel from "./components/PhotoCarousel";
import PaymentModal from "./components/PaymentModal";


const MagneticButton = ({ href, children, className = "", target, rel }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;
      const strength = Math.min(distance / maxDistance, 1);
      
      const moveX = x * 0.15 * (1 - strength);
      const moveY = y * 0.15 * (1 - strength);
      
      element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0) scale(1)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={`magnetic-element ${className}`} target={target} rel={rel}>
      {children}
    </a>
  );
};

const MagneticCard = ({ children, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 60;
      const strength = Math.min(distance / maxDistance, 1);
      
      const moveX = x * 0.12 * (1 - strength);
      const moveY = y * 0.12 * (1 - strength);
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`glass-card magnetic-element ${className}`}>
      {children}
    </div>
  );
};

const NavLink=({label,target})=>{
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.2;
      const moveY = y * 0.2;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={`#${target}`}
      className="glass-nav-link magnetic-element text-gray-700 text-sm font-medium hover:text-blue-700"
    >
      {label}
    </a>
  );
};

export default function App(){
  const [paymentModal, setPaymentModal] = useState(null);

return (
<div className="min-h-screen relative">
  <CustomCursor />
  {typeof window !== "undefined" && <WebGLBackground />}

{/* NAVBAR */}
<nav className="fixed top-0 left-0 right-0 w-full glass-nav z-50" aria-label="Navegación principal">

<div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-2 sm:p-4 md:p-5">

<h1 className="font-bold text-gray-800 text-center sm:text-left text-sm sm:text-base md:text-lg px-2">
OF Premium / OF Deluxe
</h1>

<div className="flex flex-wrap justify-center sm:justify-end gap-1 sm:gap-2 md:gap-4 lg:gap-6 text-gray-700 text-xs sm:text-sm">

<NavLink label="Referencias" target="referencias"/>
<NavLink label="Prueba contenido" target="prueba"/>
<NavLink label="Mensaje Telegram" target="mensaje"/>
<NavLink label="Metodos de pago" target="pagos"/>
<NavLink label="Modelos disponibles" target="modelos"/>
<NavLink label="Promociones" target="promos"/>

</div>

</div>
</nav>

<div className="pt-32 sm:pt-32 md:pt-36 lg:pt-40 text-center px-4">

<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">

Información de Acceso a canales VIP 

</motion.h1>

<p className="text-gray-600">
Acceso inmediato • Contenido Actualizado • Los mejores PPV
</p>

</div>

<GlassCard id="mensaje">
<h2 className="text-2xl font-semibold mb-4">Mensaje Telegram (Comprobante de pago)</h2>

<MagneticButton href="https://t.me/Rasputin1916GG" className="glass-cta bg-sky-500 font-semibold" target="_blank" rel="noopener noreferrer">
Enviar Mensaje
</MagneticButton>
</GlassCard>

<GlassCard id="referencias">
<h2 className="text-2xl font-semibold mb-4">Referencias</h2>

<PhotoCarousel
  title="Galería de referencias"
  items={[
    { src: "https://images2.imgbox.com/ee/73/uq61pLyu_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 1" },
    { src: "https://images2.imgbox.com/d1/2c/5qsF3EqV_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 2" },
    { src: "https://images2.imgbox.com/c1/53/sSkh74iJ_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 3" },
    { src: "https://images2.imgbox.com/e4/0e/lK3gI3fY_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 4" },
    { src: "https://images2.imgbox.com/40/d9/SOuJtGUe_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 5" },
    { src: "https://images2.imgbox.com/96/0d/KuolLGJT_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 6" },
    { src: "https://images2.imgbox.com/ae/d3/fEwI3A5R_o.jpeg", href: "https://t.me/refOfPremium", alt: "Referencia 7" }
  ]}
/>

{/* <MagneticButton href="https://t.me/refOfPremium" className="glass-cta bg-blue-500 font-semibold mt-4" target="_blank" rel="noopener noreferrer">
Ir a Referencias
</MagneticButton> */}
</GlassCard>

<GlassCard id="prueba">
<h2 className="text-2xl font-semibold mb-4">Prueba Contenido</h2>

<PhotoCarousel
  title="Galería de pruebas"
  items={[
    { src: "https://images2.imgbox.com/39/d2/Nto14S4V_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 1" },
    { src: "https://images2.imgbox.com/b7/92/xWjCl2G6_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 2" },
    { src: "https://images2.imgbox.com/c7/ef/v7aO6I4W_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 3" },
    { src: "https://images2.imgbox.com/8c/6b/jbFhkIoF_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 4" },
    { src: "https://images2.imgbox.com/d3/36/Og2JaRfo_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 5" },
    { src: "https://images2.imgbox.com/ce/d6/9LAEJSXd_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 6" },
    { src: "https://images2.imgbox.com/b1/67/tKRV7Uo2_o.jpeg", href: "https://t.me/pruebaCont", alt: "Prueba 7" }
  ]}
/>

{/* <MagneticButton href="https://t.me/pruebaCont" className="glass-cta bg-emerald-500 font-semibold mt-4" target="_blank" rel="noopener noreferrer">
Ver Pruebas
</MagneticButton> */}
</GlassCard>

<GlassCard id="pagos">
<h2 className="text-2xl font-semibold mb-4">Métodos de Pago</h2>

<ul className="space-y-3 text-gray-700 list-none p-0 m-0">
<li>
  <button type="button" className="payment-method-button w-full" onClick={() => setPaymentModal("transferencia")}>
    <MagneticCard className="p-4 rounded-xl">Transferencia Mexicana</MagneticCard>
  </button>
</li>
<li>
  <button type="button" className="payment-method-button w-full" onClick={() => setPaymentModal("oxxo")}>
    <MagneticCard className="p-4 rounded-xl">Depósito en OXXO</MagneticCard>
  </button>
</li>
<li>
  <button type="button" className="payment-method-button w-full" onClick={() => setPaymentModal("paypal")}>
    <MagneticCard className="p-4 rounded-xl">PayPal</MagneticCard>
  </button>
</li>
</ul>

{paymentModal && (
  <PaymentModal type={paymentModal} onClose={() => setPaymentModal(null)} />
)}
</GlassCard>

<GlassCard id="modelos">
<h2 className="text-2xl font-semibold mb-4">Modelos Disponibles</h2>

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">

{["Francesca Trisini","mommysharonc","Ennid Wong","FridaItzel","Sylunh","Emilia Vizcarra",
  "Melisa Ruiz","Yolany Gomez","xoxlovelysweets","Brenda Castro","ivana banana","ggval",
  "Neveska","Gialover","Yajana Cano","Joselis Johana","sunshine23_45","ladydusha",
  "Adriana Olivarez","Lela Sohna","Gigardez","Marta Maria Santos","Maria Julissa","Fehgalvao",
  "Whitebean","lioqueen","g88su","lilmilk69","Vanessa Bohorquez","Whossooof","Catsara",
  "Stefany Chavez"
]
.map(n=>(
<MagneticCard key={n} className="py-2.5 px-3 text-gray-800 font-medium text-sm sm:text-base truncate" title={n}>
{n}
</MagneticCard>
))}

</div>
</GlassCard>

<GlassCard id="promos">
<h2 className="text-2xl font-semibold mb-4">Promociones</h2>

<div className="space-y-4 text-gray-800">

<MagneticCard className="p-4 rounded-xl font-medium">
Grupo VIP — 200 MXN / 13 USD
</MagneticCard>

<MagneticCard className="p-4 rounded-xl font-medium">
Grupo VIP PPV — 600 MXN / 37 USD
</MagneticCard>

<MagneticCard className="p-4 rounded-xl font-medium">
VIP + VIP PPV — 700 MXN / 42 USD
</MagneticCard>

</div>
</GlassCard>

</div>
);
}
