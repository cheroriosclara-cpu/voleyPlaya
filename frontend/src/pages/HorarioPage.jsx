import React, { useEffect, useState } from 'react';
import { HorarioService } from '../service/HorarioService';
import { HorarioCard } from '../components/HorarioCard';
import { Link } from 'react-router-dom';
import '../styles/horario.css';

export const HorarioPage = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarHorarios = async () => {
    try {
      setLoading(true);
      const data = await HorarioService.getAllHorarios();
      setHorarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHorarios();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este horario?')) return;
    try {
      await HorarioService.deleteHorario(id);
      setHorarios((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const handleToggleDisponible = async (id, nuevoEstado) => {
    try {
      const horarioActual = horarios.find((h) => h.id === id);
      const horarioActualizado = { ...horarioActual, disponible: nuevoEstado };

      await HorarioService.updateHorario(id, horarioActualizado);
      setHorarios((prev) =>
        prev.map((h) => (h.id === id ? horarioActualizado : h))
      );
    } catch (err) {
      alert('Error al actualizar disponibilidad');
    }
  };

  if (loading) return <div className="loader">Cargando horarios...</div>;
  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="horario-container">
      <div className="horario-header-page">
        <h2>Gestión de Horarios</h2>
        <Link to="/horarios/nuevo" className="btn btn-primary">
          + Agregar Horario
        </Link>
      </div>

      {horarios.length === 0 ? (
        <p className="no-data">No hay horarios registrados.</p>
      ) : (
        <div className="horarios-grid">
          {horarios.map((horario) => (
            <HorarioCard
              key={horario.id}
              horario={horario}
              onDelete={handleDelete}
              onToggleDisponible={handleToggleDisponible}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HorarioPage;