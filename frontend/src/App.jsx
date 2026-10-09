import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarCard'
import CanchaPage from './pages/CanchaPage';
import PagoPage from './pages/PagoPage';
import HorarioPage from './pages/HorarioPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CanchaPage />} />
        <Route path="/canchas" element={<CanchaPage />} />
        <Route path="/pagos" element={<PagoPage/>} />
        <Route path="/horarios" element={<HorarioPage />} />
      </Routes>
    </Router>
  );
}

export default App;