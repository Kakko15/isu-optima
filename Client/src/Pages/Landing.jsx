import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SpatialCard from '../Components/SpatialCard'; // Re-using your premium card component

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-emerald-500/30 overflow-hidden relative font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-600/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />

      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 md:px-12 py-8 relative z-20">
        <h2 className="text-xl font-bold tracking-widest text-emerald-400">ISU.OPTIMA</h2>
        <button 
          onClick={() => navigate('/admin')} 
          className="px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all text-sm font-medium tracking-wide"
        >
          Access Portal
        </button>
      </nav>

      {/* Main Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[70vh] relative z-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-center"
        >
          Future <br /> Ready.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg text-white/50 max-w-lg text-center font-light leading-relaxed"
        >
          Eco-friendly resource management powered by predictive linear regression algorithms.
        </motion.p>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <SpatialCard delay={0.8} className="h-64 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white">Paperless</h3>
            <p className="text-white/50 mt-2">Zero waste processing.</p>
          </SpatialCard>
          
          <SpatialCard delay={1.0} className="h-64 flex flex-col justify-end bg-gradient-to-br from-emerald-900/20 to-black/40 border-emerald-500/30">
            <h3 className="text-2xl font-bold text-emerald-400">Predictive AI</h3>
            <p className="text-white/50 mt-2">Forecasts supply demand.</p>
          </SpatialCard>
          
          <SpatialCard delay={1.2} className="h-64 flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white">Real-time</h3>
            <p className="text-white/50 mt-2">Live status tracking.</p>
          </SpatialCard>
        </div>
      </main>
    </div>
  );
}