import { useEffect, useRef } from "react";
import * as THREE from "three";

const BLOB_COLORS = [0x38bdf8, 0xf472b6, 0xfbbf24, 0x818cf8];

export default function WebGLBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const blobs = BLOB_COLORS.map((color, i) => {
      const geometry = new THREE.SphereGeometry(1.8 + i * 0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.12 + i * 0.02,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (i - 1.5) * 2.5,
        Math.sin(i) * 1.5,
        -3 - i * 0.5
      );
      scene.add(mesh);
      return { mesh, speed: 0.15 + i * 0.05, phase: i * 1.2 };
    });

    camera.position.z = 5;

    let frameId;
    const animate = (time) => {
      frameId = requestAnimationFrame(animate);
      const t = time * 0.001;
      blobs.forEach(({ mesh, speed, phase }) => {
        mesh.position.x += Math.sin(t * speed + phase) * 0.002;
        mesh.position.y += Math.cos(t * speed * 0.8 + phase) * 0.002;
        mesh.rotation.x = t * 0.08 + phase;
        mesh.rotation.y = t * 0.06;
      });
      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      blobs.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70 pointer-events-none"
      aria-hidden="true"
    />
  );
}
