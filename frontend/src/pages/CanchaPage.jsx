import React, { useState, useEffect } from 'react';
import { 
  listarCanchas, 
  guardarCancha, 
  actualizarCancha, 
  eliminarCancha 
} from '../service/CanchaService'; // Ajusta la ruta según tu estructura[cite: 2]
import CanchaCard from '../components/CanchaCard';

function CanchaPage() {
  const [canchas, setCanchas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    numero: '',
    tipoSuperficie: '',
    estado: 'DISPONIBLE'
  });

  useEffect(() => {
    cargarCanchas();
  }, []);

  const cargarCanchas = async () => {
    try {
      const res = await listarCanchas();[cite: 2]
      setCanchas(res.data);
    } catch (error) {
      console.error('Error al obtener canchas:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await actualizarCancha(editingId, formData);[cite: 2]
      } else {
        await guardarCancha(formData);[cite: 2]
      }
      resetForm();
      cargarCanchas();
    } catch (error) {
      console.error('Error al guardar cancha:', error);
    }
  };

  const handleEdit = (cancha) => {
    setEditingId(cancha.id);
    setFormData({
      nombre: cancha.nombre || '',
      numero: cancha.numero || '',
      tipoSuperficie: cancha.tipoSuperficie || '',
      estado: cancha.estado || 'DISPONIBLE'
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar esta cancha?')) {
      try {
        await eliminarCancha(id);[cite: 2]
        cargarCanchas();
      } catch (error) {
        console.error('Error al eliminar la cancha:', error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ nombre: '', numero: '', tipoSuperficie: '', estado: 'DISPONIBLE' });
  };

  return (
    <div className="cancha-container">
      <h2 className="title">Gestión de Canchas</h2>

      {/* Formulario Crear / Editar */}
      <form onSubmit={handleSubmit} className="cancha-form">
        <h3>{editingId ? 'Editar Cancha' : 'Agregar Nueva Cancha'}</h3>
        <div className="form-group">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la cancha"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="numero"
            placeholder="Número"
            value={formData.numero}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tipoSuperficie"
            placeholder="Tipo de Superficie (Ej: Arena)"
            value={formData.tipoSuperficie}
            onChange={handleChange}
            required
          />
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="DISPONIBLE">DISPONIBLE</option>
            <option value="OCUPADO">OCUPADO</option>
            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            {editingId ? 'Actualizar' : 'Guardar'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-cancel" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Listado de Tarjetas */}
      <div className="cancha-grid">
        {canchas.map((cancha) => (
          <CanchaCard
            key={cancha.id}
            cancha={cancha}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CanchaPage;