import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SpatialCard from '../Components/SpatialCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, BookOpen, Check, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check all requirements
    const allValid = requirements.every(r => r.valid);
    
    if (!allValid) {
      toast.error("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    
    // DEMO SIGN UP
    setTimeout(() => {
      toast.success("Account created successfully!");
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  const isMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  return (
    <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center p-4 selection:bg-emerald-500/30 font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] h-[1000px] w-[1000px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-emerald-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <SpatialCard className="w-full max-w-lg backdrop-blur-3xl bg-black/40 border-white/10 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-6">
             <div className="w-6 h-6 bg-black rounded-md rotate-45" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Create ID</h2>
          <p className="text-white/40 mt-2 text-sm font-light">Join the ISU Optima Network</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">First Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type="text"
                  required
                  placeholder="Juan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Last Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type="text"
                  required
                  placeholder="Dela Cruz"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Student ID</label>
            <div className="relative group">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                type="text"
                required
                placeholder="20-12345"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input
                type="email"
                required
                placeholder="student@isu.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Password</label>
            <div className="relative group">
              <AnimatePresence mode="wait">
                {isMatch ? (
                   <motion.div 
                     initial={{ scale: 0, rotate: -180 }} 
                     animate={{ scale: 1, rotate: 0 }} 
                     exit={{ scale: 0, rotate: 180 }}
                     transition={{ type: "spring", stiffness: 200, damping: 10 }}
                     className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-emerald-400 z-10 w-5"
                   >
                     <Check size={20} strokeWidth={3} />
                   </motion.div>
                ) : (
                   <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     exit={{ scale: 0 }}
                     className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-white/30 group-focus-within:text-blue-400 transition-colors z-10 w-5"
                   >
                     <Lock size={18} />
                   </motion.div>
                )}
              </AnimatePresence>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className={`w-full bg-white/5 border rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all font-medium ${isMatch ? 'border-emerald-500/50 focus:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10 focus:border-blue-500/50'}`}
              />
              <button
                type="button"
                tabIndex="-1"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-0 bottom-0 flex items-center justify-center text-white/30 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <AnimatePresence>
              {(isPasswordFocused || password.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="grid grid-cols-2 gap-2 ml-1 overflow-hidden"
                >
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`p-0.5 rounded-full border ${req.valid ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} transition-all duration-300`}>
                        {req.valid ? <Check size={10} strokeWidth={3} /> : <X size={10} strokeWidth={3} />}
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${req.valid ? 'text-emerald-400/80' : 'text-red-400/60'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-1">Confirm Password</label>
            <div className="relative group">
              <AnimatePresence mode="wait">
                {isMatch ? (
                   <motion.div 
                     initial={{ scale: 0, rotate: -180 }} 
                     animate={{ scale: 1, rotate: 0 }} 
                     exit={{ scale: 0, rotate: 180 }}
                     transition={{ type: "spring", stiffness: 200, damping: 10 }}
                     className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-emerald-400 z-10 w-5"
                   >
                     <Check size={20} strokeWidth={3} />
                   </motion.div>
                ) : (
                   <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     exit={{ scale: 0 }}
                     className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-white/30 group-focus-within:text-blue-400 transition-colors z-10 w-5"
                   >
                     <Lock size={18} />
                   </motion.div>
                )}
              </AnimatePresence>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-white/5 border rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 transition-all font-medium ${isMatch ? 'border-emerald-500/50 focus:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10 focus:border-blue-500/50'}`}
              />
              <button
                type="button"
                tabIndex="-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-0 bottom-0 flex items-center justify-center text-white/30 hover:text-white transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-blue-400 transition-all shadow-lg shadow-white/5 hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Initialize Account'}
            </motion.button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm">
            Already have an ID?{' '}
            <Link to="/login" className="text-white font-bold hover:text-blue-400 transition-colors">
              Access Portal <ArrowRight className="inline ml-1" size={12} />
            </Link>
          </p>
        </div>
      </SpatialCard>
    </div>
  );
}
