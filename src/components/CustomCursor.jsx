import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === "undefined") return;
    
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detectar elementos interactivos
    const isInteractive = (element) => {
      if (!element) return false;
      return (
        element.tagName === "A" ||
        element.tagName === "BUTTON" ||
        element.closest("a") ||
        element.closest("button") ||
        element.closest(".glass-cta") ||
        element.closest(".glass-card") ||
        element.closest(".glass-nav-link") ||
        element.closest(".glass-panel") ||
        element.closest(".magnetic-element") ||
        element.closest("nav a") ||
        element.closest("section")
      );
    };

    const handleMouseOver = (e) => {
      if (isInteractive(e.target)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget || !isInteractive(e.relatedTarget)) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
    };
  }, []);

  // Solo mostrar cursor si hay movimiento
  if (position.x === 0 && position.y === 0) {
    return null;
  }

  return (
    <>
      {/* Cursor principal con glow glassmorphism */}
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : isClicking ? 0.8 : 1})`,
          opacity: isHovering ? 0.95 : 1,
        }}
      />
      {/* Glow/spotlight que sigue el cursor */}
      <div
        className="cursor-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.2 : 1})`,
          opacity: isHovering ? 0.5 : 0.2,
        }}
      />
    </>
  );
}
