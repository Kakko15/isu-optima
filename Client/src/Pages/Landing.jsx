import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SpatialCard from '../Components/SpatialCard';
import NeuralBackground from '../Components/NeuralBackground';
import { ArrowRight, Zap, Shield, Sparkles, Activity, Server, Globe } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white selection:bg-emerald-500/30 overflow-hidden relative font-sans">
      <NeuralBackground />
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-emerald-600/5 blur-[150px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600/5 blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full flex items-center justify-between px-6 md:px-10 py-6 md:py-10 z-50 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
           <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
             <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
           </div>
           <span className="text-2xl font-black tracking-tighter mix-blend-difference">OPTIMA<span className="text-emerald-500">.</span></span>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="pointer-events-auto px-8 py-3 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-2 group"
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
          className="text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-6 mb-8">
             <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">System Online</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
                <Activity size={12} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Nodes: 450+</span>
             </div>
          </div>

          <h1 className="text-7xl md:text-[140px] font-black leading-[0.8] tracking-tighter mb-10 text-gradient select-none">
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

        <footer className="mt-40 w-full border-t border-white/5 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                   <div className="w-3 h-3 bg-black rounded-sm rotate-45" />
                 </div>
                 <span className="font-bold tracking-tight text-white/90 text-lg">ISU<span className="text-emerald-400">OPTIMA</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Pioneering the future of academic resource management with predictive neural networks.
              </p>
              <div className="flex gap-4">
                {[Globe, Server, Activity].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors cursor-pointer">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Student Portal</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Admin Console</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">System Status</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Neural Core</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">API Reference</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  ISU IT Department
                </li>
                <li>support@isu.edu.ph</li>
                <li>+63 (02) 8888-0000</li>
                <li className="pt-4">
                   <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors">
                     Contact Support
                   </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 py-8 text-center text-white/20 text-[10px] uppercase font-black tracking-[0.2em]">
            © 2026 Isabela State University • Powered by Optima Engine v2.4
          </div>
        </footer>
      </main>
    </div>
  );
}