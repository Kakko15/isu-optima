import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import axios from 'axios';
import SpatialCard from '../Components/SpatialCard';
import { ArrowUpRight, Activity, Users, Check, X, Clock, Pill as FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('analytics');

  const fetchData = async () => {
    try {
      const [predRes, reqRes] = await Promise.all([
        axios.get('http://localhost:5000/api/PredictDemand'),
        axios.get('http://localhost:5000/api/Requests')
      ]);
      setData(predRes.data);
      setRequests(reqRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to sync with neural core.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/Requests/${id}`, { status });
      toast.success(`Request ${status}`);
      fetchData();
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  if (!data) return <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
    <span className="text-emerald-500 font-mono tracking-tighter animate-pulse">SYNCING_NEURAL_CORE...</span>
  </div>;

  const chartData = {
    labels: [...(data.history || []).map(d => `Month ${d.monthindex}`), 'Prediction'],
    datasets: [
      {
        label: 'Actual Requests',
        data: (data.history || []).map(d => d.requestcount),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Trend Line (Regression)',
        data: [...(data.trendLine || []).map(d => d.y), data.prediction],
        borderColor: '#3b82f6',
        borderDash: [5, 5],
        tension: 0,
        pointStyle: 'rectRot',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'white', font: { family: 'Outfit' } } }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'white/50' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'white/50' } }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-8 md:px-12 font-sans selection:bg-emerald-500/30">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white">
            Console<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-white/40 mt-2 text-lg font-light tracking-wide">Predictive Algorithm & Request Control</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'analytics' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
          >
            Analytics
          </button>
          <button 
             onClick={() => setActiveTab('requests')}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all relative ${activeTab === 'requests' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
          >
            Requests
            {requests.filter(r => r.status === 'pending').length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[10px] flex items-center justify-center text-black border-2 border-black font-bold">
                {requests.filter(r => r.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </header>

      {activeTab === 'analytics' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SpatialCard delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-blue-500/20 text-blue-400"><Activity size={24} /></div>
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">Next Month Forecast</h3>
            </div>
            <div className="text-6xl font-black tracking-tighter text-white">{data.prediction}</div>
            <p className="text-xs text-white/30 mt-4 border-t border-white/5 pt-4 font-mono">ESTIMATED_ID_SUPPLY_UNIT</p>
          </SpatialCard>

          <SpatialCard delay={0.2}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400"><ArrowUpRight size={24} /></div>
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">Growth Trend</h3>
            </div>
            <div className="text-6xl font-black tracking-tighter text-white">
              {data.history && data.history.length > 0 
                ? Math.round(((data.prediction - data.history[data.history.length-1].requestcount) / data.history[data.history.length-1].requestcount) * 100) 
                : 0}%
            </div>
            <p className="text-xs text-white/30 mt-4 border-t border-white/5 pt-4 font-mono">VARIANCE_VS_PREVIOUS_PERIOD</p>
          </SpatialCard>

          <SpatialCard delay={0.3} className="bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400"><Users size={24} /></div>
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest">AI Insight</h3>
            </div>
            <div className="text-lg font-medium leading-relaxed text-white/90">
              "{data.insight}"
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">Optimization Triggered</p>
            </div>
          </SpatialCard>

          <SpatialCard className="lg:col-span-3 h-[500px]" delay={0.4}>
            <div className="h-full w-full p-4 flex flex-col">
              <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
                <FileText className="text-emerald-500" /> Neural Regression Analysis
              </h3>
              <div className="flex-grow">
                <Line options={options} data={chartData} />
              </div>
            </div>
          </SpatialCard>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={req.id} 
              className="glass p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white/90 font-mono text-sm">{req.studentid}</h4>
                  <p className="text-sm text-white/40">{req.reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    req.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                    req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {req.status}
                  </span>
                  <p className="text-[10px] text-white/20 mt-1 flex items-center gap-1">
                    <Clock size={10} /> {new Date(req.createdat).toLocaleDateString()}
                  </p>
                </div>

                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdateStatus(req.id, 'rejected')}
                      className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X size={18} />
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(req.id, 'approved')}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <Check size={18} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {requests.length === 0 && (
            <div className="py-20 text-center text-white/20 font-mono uppercase tracking-widest border-2 border-dashed border-white/5 rounded-3xl">
              No transmission logs found
            </div>
          )}
        </div>
      )}
    </div>
  );
}