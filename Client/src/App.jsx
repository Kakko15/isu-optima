import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './Pages/Loader';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';
import CommandPalette from './Components/CommandPalette';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      
      {/* Show Loader first, then the App */}
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <BrowserRouter>
          <Navbar />
          <CommandPalette />
          <Routes>
            {/* 1. Start at Landing Page */}
            <Route path="/" element={<Landing />} />
            
            {/* 2. Login Page */}
            <Route path="/login" element={<Login />} />
            
            {/* 3. Role-Based Dashboards */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}