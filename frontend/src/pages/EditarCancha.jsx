import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCanchaById, updateCancha } from '../service/CanchaService';
import '../styles/Cancha.css';

export const EditarCancha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    precioPorHora: '',
    disponible: true,
  });

  useEffect(() => {
    cargarCancha();
  }, [id]);

  const cargarCancha = async () => {
    try {
      const response = await getCanchaById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error al cargar la cancha:', error);
    }
  };

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
      await updateCancha(id, {
        ...formData,
        precioPorHora: parseFloat(formData.precioPorHora),
      });
      navigate('/canchas');
    } catch (error) {
      console.error('Error al actualizar la cancha:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Cancha</h2>
      <form onSubmit={handleSubmit} className="form-cancha">
        <div className="form-group">
          <label>Nombre de la cancha:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
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
            Actualizar
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

export default EditarCancha;