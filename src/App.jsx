import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import WebGLBackground from "./WebGLBackground";
import CustomCursor from "./components/CustomCursor";


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

return (
<div className="min-h-screen relative">
  <CustomCursor />
  <WebGLBackground />

{/* NAVBAR */}
<nav className="fixed w-full glass-nav z-50" aria-label="Navegación principal">

<div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4">

<h1 className="font-bold text-gray-800 text-center sm:text-left shrink-0">
OF Premium / OF Deluxe
</h1>

<div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 md:gap-6 text-gray-700 text-sm">

<NavLink label="Referencias" target="referencias"/>
<NavLink label="Prueba contenido" target="prueba"/>
<NavLink label="Mensaje Telegram" target="mensaje"/>
<NavLink label="Metodos de pago" target="pagos"/>
<NavLink label="Modelos disponibles" target="modelos"/>
<NavLink label="Promociones" target="promos"/>

</div>

</div>
</nav>

<div className="pt-28 text-center px-4">

<motion.h1
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="text-5xl font-bold text-gray-800 mb-4">

Información de Acceso a canales VIP 

</motion.h1>

<p className="text-gray-600">
Acceso inmediato • Contenido Actualizado • Los mejores PPV
</p>

</div>

<GlassCard id="referencias">
<h2 className="text-2xl font-semibold mb-4">Referencias</h2>

<MagneticButton href="https://t.me/refOfPremium" className="glass-cta bg-blue-500 font-semibold" target="_blank" rel="noopener noreferrer">
Ir a Referencias
</MagneticButton>
</GlassCard>

<GlassCard id="prueba">
<h2 className="text-2xl font-semibold mb-4">Prueba Contenido</h2>

<MagneticButton href="https://t.me/pruebaCont" className="glass-cta bg-emerald-500 font-semibold" target="_blank" rel="noopener noreferrer">
Ver Pruebas
</MagneticButton>
</GlassCard>

<GlassCard id="mensaje">
<h2 className="text-2xl font-semibold mb-4">Mensaje Telegram</h2>

<MagneticButton href="https://t.me/Rasputin1916GG" className="glass-cta bg-sky-500 font-semibold" target="_blank" rel="noopener noreferrer">
Enviar Mensaje
</MagneticButton>
</GlassCard>

<GlassCard id="pagos">
<h2 className="text-2xl font-semibold mb-4">Métodos de Pago</h2>

<ul className="space-y-3 text-gray-700 list-none p-0 m-0">
<li><MagneticCard className="p-4 rounded-xl">Transferencia Mexicana</MagneticCard></li>
<li><MagneticCard className="p-4 rounded-xl">Depósito en OXXO</MagneticCard></li>
<li><MagneticCard className="p-4 rounded-xl">PayPal</MagneticCard></li>
</ul>
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
