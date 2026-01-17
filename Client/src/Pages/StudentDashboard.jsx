import { useState, useEffect } from 'react';
import SpatialCard from '../Components/SpatialCard';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, Clock, FileText, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function StudentDashboard() {
  const [reason, setReason] = useState('Lost ID');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [myRequests, setMyRequests] = useState([]);
  
  // Demo ID - in real app this comes from Supabase Auth
  const studentId = "STUD-2024-0001";

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/Requests');
      // For demo, we just filter by our demo studentId
      setMyRequests(res.data.filter(r => r.studentid === studentId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      await axios.post('http://localhost:5000/api/RequestID', {
        studentId, 
        reason 
      });
      toast.success("Request beamed to control center.");
      setStatus('success');
      fetchMyRequests();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      toast.error("Transmission failed.");
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] -z-10" />
      
      <header className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter">Portal<span className="text-blue-500">.</span></h1>
        <p className="text-white/40 mt-2 text-lg font-light">Student Identification & Records</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-5 space-y-8">
          <SpatialCard delay={0.1}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText className="text-blue-400" size={20} /> Request Replacement
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 font-black">Reason for Request</label>
                <select 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                >
                  <option value="Lost ID">Lost ID Card</option>
                  <option value="Damaged">Damaged / Broken</option>
                  <option value="Correction">Correction of Entry</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-white/5 rounded-xl p-8 flex flex-col items-center justify-center text-white/20 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group">
                <Upload className="mb-4 group-hover:text-blue-400 transition-colors" />
                <p className="text-xs font-bold uppercase tracking-widest">Affidavit of Loss</p>
                <p className="text-[10px] mt-1 text-white/10">DRAG & DROP OR BROWSE</p>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3 text-emerald-400"
                  >
                    <CheckCircle size={20} />
                    <span className="font-bold text-sm">Transmission Successful</span>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    className="w-full py-4 rounded-xl bg-blue-600 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Encrypting...' : 'Initiate Request'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </SpatialCard>

          <SpatialCard delay={0.2} className="bg-gradient-to-br from-blue-600/10 to-transparent border-blue-600/20">
             <div className="flex justify-between items-start">
               <div>
                 <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Digital Identity</h3>
                 <p className="text-white/20 text-[10px] mt-1 font-mono">ENCRYPTED_ID: {studentId}</p>
               </div>
               <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-tighter">
                 Active
               </div>
             </div>
             <div className="mt-12 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                 <Clock size={20} />
               </div>
               <div>
                 <p className="text-xs text-white/40">Next Renewal</p>
                 <p className="text-sm font-bold">Sept 2026</p>
               </div>
             </div>
          </SpatialCard>
        </div>

        <div className="lg:col-span-7 space-y-6">
           <h3 className="text-sm font-black uppercase tracking-widest text-white/30 ml-2">Request History</h3>
           <div className="space-y-4">
             {myRequests.map((req, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 + (i * 0.1) }}
                 key={req.id} 
                 className="glass p-5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all"
               >
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black ${
                      req.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                      req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {req.status === 'pending' ? 'P' : req.status === 'approved' ? 'A' : 'R'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white/80">{req.reason}</h4>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{new Date(req.createdat).toLocaleDateString()}</p>
                    </div>
                 </div>
                 <ChevronRight size={16} className="text-white/10 group-hover:text-white/40 transition-colors" />
               </motion.div>
             ))}
             {myRequests.length === 0 && (
               <div className="py-20 text-center text-white/10 font-mono text-xs uppercase tracking-[0.3em] border-2 border-dashed border-white/5 rounded-3xl">
                 No history found
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}