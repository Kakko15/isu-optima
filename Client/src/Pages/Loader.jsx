import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-24 border-4 border-emerald-500 bg-emerald-500/20 blur-md"
        />
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-3xl font-light tracking-[0.5em] text-white"
        >
          ISU OPTIMA
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}