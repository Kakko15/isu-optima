const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

function PerformLinearRegression(data) {
  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += data[i].monthIndex;
    sumY += data[i].requestCount;
    sumXY += data[i].monthIndex * data[i].requestCount;
    sumXX += data[i].monthIndex * data[i].monthIndex;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

app.get('/api/PredictDemand', async (req, res) => {
  const { data: history, error } = await supabase
    .from('HistoricalData')
    .select('*')
    .order('monthIndex', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  const { slope, intercept } = PerformLinearRegression(history);
  const nextMonthIndex = history.length + 1;
  const prediction = Math.round(slope * nextMonthIndex + intercept);

  const trendLine = history.map(item => ({
    x: item.monthIndex,
    y: slope * item.monthIndex + intercept
  }));

  res.json({
    history,
    prediction,
    trendLine,
    insight: prediction > history[history.length - 1].requestCount
      ? "Increasing Demand: Stock up on PVC."
      : "Stable/Decreasing Demand: Maintain current stock."
  });
});

app.post('/api/RequestID', async (req, res) => {
  const { studentId, reason } = req.body;
  
  const { data, error } = await supabase
    .from('Requests')
    .insert([{ studentId, reason }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.listen(5000, () => console.log('Server running on port 5000'));