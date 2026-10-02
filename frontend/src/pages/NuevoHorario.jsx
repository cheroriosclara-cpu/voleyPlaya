import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HorarioService } from '../service/HorarioService';
import '../styles/horario.css';

export const NuevoHorario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diaSemana: 'Lunes',
    horaInicio: '08:00',
    horaFin: '09:00',
    precio: '',
    disponible: true
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await HorarioService.createHorario(formData);
      navigate('/horarios');
    } catch (err) {
      alert('Ocurrió un error al guardar el horario');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-container">
      <h3>Registrar Nuevo Horario</h3>
      <form onSubmit={handleSubmit} className="horario-form">
        <div className="form-group">
          <label>Día de la semana:</label>
          <select name="diaSemana" value={formData.diaSemana} onChange={handleChange}>
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(dia => (
              <option key={dia} value={dia}>{dia}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Hora Inicio:</label>
            <input
              type="time"
              name="horaInicio"
              value={formData.horaInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora Fin:</label>
            <input
              type="time"
              name="horaFin"
              value={formData.horaFin}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Precio (S/.):</label>
          <input
            type="number"
            name="precio"
            placeholder="0.00"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-checkbox">
          <label>
            <input
              type="checkbox"
              name="disponible"
              checked={formData.disponible}
              onChange={handleChange}
            />
            Disponible para reservas
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Horario'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/horarios')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};