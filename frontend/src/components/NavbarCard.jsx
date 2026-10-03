import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Inicio</Link>
      <Link to="/canchas" style={{ color: '#fff', marginRight: '1rem' }}>Canchas</Link>
      <Link to="/pagos" style={{ color: '#fff', marginRight: '1rem' }}>Pagos</Link>
      <Link to="/horarios" style={{ color: '#fff', marginRight: '1rem' }}>Horarios</Link>
    </nav>
  );
};

export default Navbar;