import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutDashboard, LogIn, User, ArrowRight, Command } from 'lucide-react';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands = [
    { label: 'Go to Admin Console', icon: LayoutDashboard, action: () => navigate('/admin'), shortcut: 'A' },
    { label: 'Go to Student Portal', icon: User, action: () => navigate('/student'), shortcut: 'S' },
    { label: 'Log In', icon: LogIn, action: () => navigate('/login'), shortcut: 'L' },
    { label: 'Return Home', icon: ArrowRight, action: () => navigate('/'), shortcut: 'H' },
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  const execute = (action) => {
    action();
    setOpen(false);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {open && (
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-center justify-center p-4"
           onClick={() => setOpen(false)}
         >
           <motion.div 
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             transition={{ type: "spring", stiffness: 300, damping: 30 }}
             onClick={(e) => e.stopPropagation()}
             className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
           >
             <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
                <Search size={20} className="text-white/40" />
                <input 
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command..." 
                  className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/20 text-lg font-light"
                />
                <div className="px-2 py-1 rounded bg-white/10 text-white/50 text-xs font-mono">ESC</div>
             </div>
             
             <div className="max-h-[300px] overflow-y-auto p-2">
                {filtered.map((cmd, i) => (
                  <button 
                    key={i}
                    onClick={() => execute(cmd.action)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-emerald-500/20 hover:text-emerald-400 text-white/70 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <cmd.icon size={18} className="text-white/30 group-hover:text-emerald-400" />
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    {cmd.shortcut && (
                      <span className="text-xs font-mono text-white/20 group-hover:text-emerald-500/50">
                        Ctrl+{cmd.shortcut}
                      </span>
                    )}
                  </button>
                ))}
                {filtered.length === 0 && (
                   <div className="p-8 text-center text-white/20 text-sm">No commands found.</div>
                )}
             </div>
             <div className="px-4 py-2 bg-white/5 border-t border-white/5 text-[10px] text-white/30 flex items-center justify-between">
                <span>ISU OPTIMA CONSOLE</span>
                <div className="flex items-center gap-2">
                  <Command size={10} />
                  <span>Command Palette</span>
                </div>
             </div>
           </motion.div>
         </motion.div>
      )}
    </AnimatePresence>
  );
}
