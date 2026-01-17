import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SpatialCard({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const sheenOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.6]);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative glass rounded-3xl p-1 border border-white/5 bg-black/40 overflow-hidden group perspective-1000 ${className}`}
    >
       {/* Inner Card Content */}
       <div className="relative z-10 w-full h-full rounded-[20px] bg-gradient-to-br from-white/5 to-transparent p-6 overflow-hidden">
         <div style={{ transform: "translateZ(30px)" }} className="relative z-20">
            {children}
         </div>
         
         {/* Dynamic Sheen Effect */}
         <motion.div 
            style={{ 
              opacity: sheenOpacity,
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 60%, transparent)',
              left: sheenX, 
              width: '200%',
              height: '200%'
            }}
            className="absolute top-[-50%] left-[-50%] pointer-events-none z-10 rotate-45 blur-md"
         />
       </div>
    </motion.div>
  );
}