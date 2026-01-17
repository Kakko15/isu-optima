import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Home, LayoutDashboard, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';

  if (isHome) return null; // Let the landing page handle its own nav

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl px-6 py-3 glass rounded-2xl flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-black text-sm">O</div>
        <span className="font-bold tracking-tight text-white/90">ISU<span className="text-emerald-400">OPTIMA</span></span>
      </div>

      <div className="flex items-center gap-6">
        {!isLogin && (
          <div className="flex items-center gap-4 text-sm text-white/60">
            <button 
              onClick={() => navigate(location.pathname.includes('admin') ? '/admin' : '/student')}
              className={`hover:text-white transition-colors flex items-center gap-2 ${location.pathname !== '/login' ? 'text-emerald-400 font-medium' : ''}`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="hover:text-red-400 transition-colors flex items-center gap-2 text-white/40 hover:text-white"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
        {isLogin && (
           <button onClick={() => navigate('/')} className="text-sm text-white/60 hover:text-white flex items-center gap-2">
             <Home size={16} /> Back Home
           </button>
        )}
      </div>
    </nav>
  );
}
