import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import axios from 'axios';
import SpatialCard from '../Components/SpatialCard';
import { ArrowUpRight, Activity, Users } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/PredictDemand').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Analyzing Data...</div>;

  const chartData = {
    labels: [...data.history.map(d => `Month ${d.monthIndex}`), 'Prediction'],
    datasets: [
      {
        label: 'Actual Requests',
        data: data.history.map(d => d.requestCount),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Trend Line (Regression)',
        data: [...data.trendLine.map(d => d.y), data.prediction],
        borderColor: '#3b82f6',
        borderDash: [5, 5],
        tension: 0,
        pointStyle: 'rectRot',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } },
      y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-sans selection:bg-emerald-500/30">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            ISU OPTIMA
          </h1>
          <p className="text-white/40 mt-2 text-lg">Resource Management & Prediction Console</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-xs text-white/50 uppercase tracking-widest">System Status</p>
            <p className="text-emerald-400 font-bold flex items-center gap-2 justify-end">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Operational
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <SpatialCard delay={0.1}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-blue-500/20 text-blue-400"><Activity size={24} /></div>
            <h3 className="text-lg font-medium text-white/80">Next Month Forecast</h3>
          </div>
          <div className="text-6xl font-bold tracking-tight text-white">{data.prediction}</div>
          <p className="text-sm text-white/40 mt-2">Estimated ID Cards needed</p>
        </SpatialCard>

        <SpatialCard delay={0.2}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400"><ArrowUpRight size={24} /></div>
            <h3 className="text-lg font-medium text-white/80">Growth Trend</h3>
          </div>
          <div className="text-6xl font-bold tracking-tight text-white">
            {Math.round(((data.prediction - data.history[data.history.length-1].requestCount) / data.history[data.history.length-1].requestCount) * 100)}%
          </div>
          <p className="text-sm text-white/40 mt-2">Demand increase vs last month</p>
        </SpatialCard>

        <SpatialCard delay={0.3}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-purple-500/20 text-purple-400"><Users size={24} /></div>
            <h3 className="text-lg font-medium text-white/80">AI Insight</h3>
          </div>
          <div className="text-xl font-light leading-relaxed text-white/90">
            "{data.insight}"
          </div>
          <p className="text-xs text-emerald-400 mt-4 uppercase tracking-wider font-bold">Recommended Action</p>
        </SpatialCard>

        <SpatialCard className="lg:col-span-3 h-[600px]" delay={0.4}>
          <div className="h-full w-full p-4 flex flex-col">
            <h3 className="text-2xl font-bold mb-6 text-white/90">Linear Regression Analysis</h3>
            <div className="flex-grow">
              <Line options={{...options, maintainAspectRatio: false}} data={chartData} />
            </div>
          </div>
        </SpatialCard>
      </div>
    </div>
  );
}