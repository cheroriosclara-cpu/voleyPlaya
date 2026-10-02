import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HorarioService } from '../service/HorarioService';
import '../styles/horario.css';

export const EditarHorario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    canchaId: '',
    diaSemana: '',
    horaInicio: '',
    horaFin: '',
    disponible: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      HorarioService.getHorarioById(id)
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al cargar el horario:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await HorarioService.updateHorario(id, formData);
      alert('¡Horario actualizado con éxito!');
      navigate('/horario');
    } catch (error) {
      alert('Error al actualizar el horario');
    }
  };

  if (loading) return <p>Cargando información del horario...</p>;

  return (
    <div className="horario-container">
      <h2>Editar Horario #{id}</h2>
      <form className="horario-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>ID Cancha:</label>
          <input
            type="text"
            name="canchaId"
            value={formData.canchaId}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Día de la semana:</label>
          <select name="diaSemana" value={formData.diaSemana} onChange={handleChange} required>
            <option value="">Selecciona un día</option>
            <option value="LUNES">Lunes</option>
            <option value="MARTES">Martes</option>
            <option value="MIERCOLES">Miércoles</option>
            <option value="JUEVES">Jueves</option>
            <option value="VIERNES">Viernes</option>
            <option value="SABADO">Sábado</option>
            <option value="DOMINGO">Domingo</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Hora Inicio:</label>
          <input
            type="time"
            name="horaInicio"
            value={formData.horaInicio}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Hora Fin:</label>
          <input
            type="time"
            name="horaFin"
            value={formData.horaFin}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              name="disponible"
              checked={formData.disponible}
              onChange={handleChange}
            />
            ¿Habilitado?
          </label>
        </div>

        <button type="submit">Actualizar Horario</button>
      </form>
    </div>
  );
};
