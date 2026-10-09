import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCancha } from '../service/CanchaService';
import '../styles/Cancha.css';

export const NuevoCancha = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Voley Playa',
    precioPorHora: '',
    disponible: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCancha({
        ...formData,
        precioPorHora: parseFloat(formData.precioPorHora),
      });
      navigate('/canchas'); // Redirige a la lista de canchas
    } catch (error) {
      console.error('Error al guardar la cancha:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Nueva Cancha</h2>
      <form onSubmit={handleSubmit} className="form-cancha">
        <div className="form-group">
          <label>Nombre de la cancha:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Cancha Principal"
          />
        </div>

        <div className="form-group">
          <label>Tipo:</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Precio por Hora (S/):</label>
          <input
            type="number"
            step="0.01"
            name="precioPorHora"
            value={formData.precioPorHora}
            onChange={handleChange}
            required
            placeholder="0.00"
          />
        </div>

        <div className="form-group checkbox-group">
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

        <div className="form-actions">
          <button type="submit" className="btn-save">
            Guardar
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/canchas')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoCancha;