import { useState } from 'react';
import SpatialCard from '../Components/SpatialCard';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';

export default function StudentDashboard() {
  const [reason, setReason] = useState('Lost ID');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      // Simulate ID "123" for demo
      await axios.post('http://localhost:5000/api/RequestID', {
        studentId: '123e4567-e89b-12d3-a456-426614174000', 
        reason 
      });
      setTimeout(() => setStatus('success'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      <header className="relative z-10 mb-12">
        <h1 className="text-4xl font-bold text-white">Student Portal</h1>
        <p className="text-white/40 mt-2">Request ID Replacement</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        <SpatialCard delay={0.1}>
          <h3 className="text-xl font-bold mb-6">Application Form</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-bold">Replacement Reason</label>
              <select 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
              >
                <option value="Lost ID">Lost ID Card</option>
                <option value="Damaged">Damaged / Broken</option>
                <option value="Correction">Correction of Entry</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-white/40 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group">
              <Upload className="mb-4 group-hover:text-emerald-400 transition-colors" />
              <p className="text-sm">Upload Affidavit of Loss</p>
              <p className="text-xs mt-1 text-white/20">(PDF or JPG)</p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3 text-emerald-400"
                >
                  <CheckCircle size={20} />
                  <span className="font-bold">Request Submitted Successfully</span>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold tracking-wide hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Processing...' : 'Submit Request'}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </SpatialCard>

        <div className="space-y-6">
           <SpatialCard delay={0.2} className="h-48 bg-gradient-to-br from-blue-900/20 to-black">
             <div className="flex justify-between items-start">
               <div>
                 <h3 className="text-lg font-bold text-blue-400">Current Request Status</h3>
                 <p className="text-white/40 text-sm mt-1">Ref: #88219-X</p>
               </div>
               <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                 Processing
               </div>
             </div>
             <div className="mt-8 w-full bg-white/10 h-1 rounded-full overflow-hidden">
               <div className="bg-blue-500 h-full w-[60%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
             </div>
             <p className="text-xs text-right mt-2 text-white/30">Step 3 of 4: Printing</p>
           </SpatialCard>

           <SpatialCard delay={0.3} className="h-full flex flex-col justify-center items-center text-center p-8">
              <div className="h-24 w-40 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-2xl rotate-3 mb-6 flex items-end p-3">
                 <p className="text-[10px] font-bold text-white/80">ISABELA STATE UNIVERSITY</p>
              </div>
              <h3 className="text-lg font-bold">Digital ID Preview</h3>
              <p className="text-white/40 text-sm mt-2">Your data is secure.</p>
           </SpatialCard>
        </div>
      </div>
    </div>
  );
}