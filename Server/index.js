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
  if (n === 0) return { slope: 0, intercept: 0 };
  if (n === 1) return { slope: 0, intercept: data[0].requestCount };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += data[i].monthindex;
    sumY += data[i].requestcount;
    sumXY += data[i].monthindex * data[i].requestcount;
    sumXX += data[i].monthindex * data[i].monthindex;
  }

  const denominator = (n * sumXX - sumX * sumX);
  if (denominator === 0) return { slope: 0, intercept: sumY / n };

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

app.get('/api/PredictDemand', async (req, res) => {
  console.log('Received request for /api/PredictDemand');
  try {
    const { data: history, error } = await supabase
      .from('historicaldata')
      .select('*')
      .order('monthindex', { ascending: true });

    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('History data fetched:', history);

    if (!history || history.length === 0) {
      console.log('No historical data found');
      return res.json({
        history: [],
        prediction: 0,
        trendLine: [],
        insight: "No data available yet."
      });
    }

    const { slope, intercept } = PerformLinearRegression(history);
    const nextMonthIndex = history.length + 1;
    const prediction = Math.round(slope * nextMonthIndex + intercept);

    const trendLine = history.map(item => ({
      x: item.monthindex,
      y: slope * item.monthindex + intercept
    }));

    res.json({
      history,
      prediction,
      trendLine,
      insight: history.length > 0 && prediction > history[history.length - 1].requestcount
        ? "Increasing Demand: Stock up on PVC."
        : "Stable/Decreasing Demand: Maintain current stock."
    });
  } catch (err) {
    console.error('Server side error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/Requests', async (req, res) => {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('createdat', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/RequestID', async (req, res) => {
  const { studentId, reason } = req.body;
  
  const { data, error } = await supabase
    .from('requests')
    .insert([{ studentid: studentId, reason: reason }]); // Mapping to lowercase columns

  if (error) {
    console.error('Insert Error:', error);
    return res.status(400).json({ error: error.message });
  }
  res.json({ success: true, data });
});

app.patch('/api/Requests/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const { data, error } = await supabase
    .from('requests')
    .update({ status })
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data });
});

app.listen(5000, () => console.log('Server running on port 5000'));