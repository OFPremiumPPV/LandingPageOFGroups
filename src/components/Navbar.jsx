import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  {
    label: "Referencias",
    target: "referencias",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    label: "Prueba",
    target: "prueba",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    target: "mensaje",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.295-1.023 1.295-.479 0-1.061-.383-2.047-.933-2.033-1.202-3.182-1.942-3.446-2.22-.765-.71-1.064-1.551-.713-2.39.273-.641.625-.916 1.014-1.106.307-.15.794-.332 1.234-.503.82-.343 1.385-.585 1.695-.726.36-.165.662-.032.825.233.05.085.085.202.1.336z" />
      </svg>
    ),
  },
  {
    label: "Pagos",
    target: "pagos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    label: "Modelos",
    target: "modelos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Precios",
    target: "promos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "FAQ",
    target: "faq",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function NavPill({ item, isActive }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
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
      href={`#${item.target}`}
      className={`glass-nav-pill magnetic-element${isActive ? " glass-nav-pill--active" : ""}`}
      title={item.label}
    >
      <span className="glass-nav-pill-icon">{item.icon}</span>
      <span className="glass-nav-pill-label">{item.label}</span>
    </a>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.target);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="glass-nav" aria-label="Navegación principal">
      <div className="glass-nav-inner">
        <a href="#" className="glass-nav-brand magnetic-element">
          <span className="glass-nav-brand-icon" aria-hidden="true">✦</span>
          <span className="glass-nav-brand-text">
            <span className="glass-nav-brand-title">OF Premium</span>
            <span className="glass-nav-brand-sub">/ OF Deluxe</span>
          </span>
          <span className="glass-nav-vip-badge">VIP</span>
        </a>

        <div className="glass-nav-dock" role="navigation">
          <div className="glass-nav-dock-track">
            {NAV_ITEMS.map((item) => (
              <NavPill
                key={item.target}
                item={item}
                isActive={activeSection === item.target}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
