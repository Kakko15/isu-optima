import { useState } from 'react';
import { supabase } from '../SupabaseClient'; // We will create this file next
import { useNavigate } from 'react-router-dom';
import SpatialCard from '../Components/SpatialCard';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // DEMO BYPASS: If email is "admin", go to Admin. If "student", go to Student.
    // In production, use supabase.auth.signInWithOtp({ email })
    
    setTimeout(() => {
      if (email.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/student');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 selection:bg-emerald-500/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] h-[1000px] w-[1000px] rounded-full bg-emerald-600/10 blur-[150px]" />
      </div>

      <SpatialCard className="w-full max-w-md backdrop-blur-2xl bg-black/40 border-white/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-white/40 mt-2 text-sm">Enter your credentials to access the portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-bold">Email Access</label>
            <input
              type="text"
              required
              placeholder="admin@isu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold tracking-wide shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">Secured by ISU OPTIMA Cloud</p>
        </div>
      </SpatialCard>
    </div>
  );
}