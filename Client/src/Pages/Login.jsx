import { useState } from 'react';
import { supabase } from '../SupabaseClient'; // We will create this file next
import { useNavigate } from 'react-router-dom';
import SpatialCard from '../Components/SpatialCard';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // DEMO AUTHENTICATION
    // In a real app, this would match against Supabase Auth
    
    setTimeout(() => {
      if (email.toLowerCase().includes('admin') && password === 'admin123') {
        toast.success("Welcome back, Administrator.");
        navigate('/admin');
      } else if (password.length >= 6) {
        toast.success("Student Access Granted.");
        navigate('/student');
      } else {
         toast.error("Invalid Credentials. Try 'admin' / 'admin123'");
         setLoading(false);
         return;
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 selection:bg-emerald-500/30 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] h-[1000px] w-[1000px] rounded-full bg-emerald-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <SpatialCard className="w-full max-w-md backdrop-blur-3xl bg-black/40 border-white/10 p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-6 shadow-2xl">
             <Lock className="text-emerald-400" size={24} />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h2>
          <p className="text-white/40 mt-2 text-sm font-light">Secure access to ISU Optima Console</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Email / ID</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors" size={18} />
              <input
                type="text"
                required
                placeholder="email@isu.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-emerald-400 transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all shadow-lg shadow-white/5 hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'Decrypting Credentials...' : 'Access Portal'}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-white/40 text-sm">
             Don't have an ID?{' '}
             <button 
               onClick={() => navigate('/signup')}
               className="text-white font-bold hover:text-emerald-400 transition-colors"
             >
               Create Account
             </button>
           </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">Secured by ISU OPTIMA Cloud</p>
        </div>
      </SpatialCard>
    </div>
  );
}