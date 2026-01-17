import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './Pages/Loader';
import AdminDashboard from './Pages/AdminDashboard';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}