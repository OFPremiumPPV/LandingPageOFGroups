import { motion } from "framer-motion";

export default function GlassCard({children,id}){

return(
<motion.section
id={id}
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
viewport={{once:true,margin:"-50px"}}
whileHover={{scale:1.01}}
transition={{duration:0.6}}
className="glass-panel p-10 max-w-5xl mx-auto my-12">

{children}

</motion.section>
);
}
