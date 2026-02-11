import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground(){

const mountRef = useRef(null);

useEffect(()=>{

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);

if(mountRef.current){
  mountRef.current.appendChild(renderer.domElement);
}

const geometry=new THREE.PlaneGeometry(10,10,32,32);
const material=new THREE.MeshBasicMaterial({
color:0x93c5fd,
wireframe:true,
transparent:true,
opacity:0.15
});

const plane=new THREE.Mesh(geometry,material);
scene.add(plane);

camera.position.z=5;

const animate=()=>{
requestAnimationFrame(animate);
plane.rotation.x+=0.001;
plane.rotation.y+=0.001;
renderer.render(scene,camera);
};

animate();

const handleResize=()=>{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
};

window.addEventListener("resize",handleResize);

return()=>{
window.removeEventListener("resize",handleResize);
if(mountRef.current && renderer.domElement.parentNode){
  mountRef.current.removeChild(renderer.domElement);
}
renderer.dispose();
};

},[]);

return(
<div
ref={mountRef}
className="fixed top-0 left-0 w-full h-full -z-10 opacity-60"
/>
);
}
