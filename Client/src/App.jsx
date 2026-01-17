import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './Pages/Loader';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';
import CommandPalette from './Components/CommandPalette';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminDashboard from './Pages/AdminDashboard';
import StudentDashboard from './Pages/StudentDashboard';
import AnimatedPage from './Components/AnimatedPage'; // We will create this wrapper

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Navbar />
          <CommandPalette />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedPage><Landing /></AnimatedPage>} />
              <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
              <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
              <Route path="/admin" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
              <Route path="/student" element={<AnimatedPage><StudentDashboard /></AnimatedPage>} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </>
  );
}