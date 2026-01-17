import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SpatialCard from '../Components/SpatialCard';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white selection:bg-emerald-500/30 overflow-hidden relative font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-emerald-600/10 blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full flex items-center justify-between px-10 py-10 z-50">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
             <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
           </div>
           <span className="text-2xl font-black tracking-tighter">OPTIMA<span className="text-emerald-500">.</span></span>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="px-8 py-3 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-2xl shadow-white/5 flex items-center gap-2 group"
        >
          Access Center <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 pt-44 pb-20 px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-8 inline-block">
             Neural Supply Chain Management
          </span>
          <h1 className="text-7xl md:text-[140px] font-black leading-[0.8] tracking-tighter mb-10 text-gradient">
            SMART<br />ISABELA<span className="text-emerald-500">.</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg md:text-xl font-light leading-relaxed mx-auto italic">
            "Harnessing predictive AI to eliminate resource friction for the future of ISU."
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <SpatialCard delay={0.5} className="group">
            <Zap className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold mb-3 tracking-tight">Real-time Sync</h3>
            <p className="text-white/40 text-sm leading-relaxed">Instant transmission of credentials across the university network.</p>
          </SpatialCard>

          <SpatialCard delay={0.7} className="border-emerald-500/20 bg-emerald-500/5 group">
            <Sparkles className="text-emerald-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-emerald-400">AI Regression</h3>
            <p className="text-white/40 text-sm leading-relaxed">Sophisticated linear regression models predict supply shortages before they happen.</p>
          </SpatialCard>

          <SpatialCard delay={0.9} className="group">
            <Shield className="text-blue-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold mb-3 tracking-tight text-blue-400">Zero Waste</h3>
            <p className="text-white/40 text-sm leading-relaxed">Carbon-neutral footprint through optimized paperless workflows.</p>
          </SpatialCard>
        </div>

        <footer className="mt-40 text-white/10 text-[10px] uppercase font-black tracking-[0.5em]">
          ISABELA STATE UNIVERSITY © 2026 TECHNOLOGY CONSOLE
        </footer>
      </main>
    </div>
  );
}