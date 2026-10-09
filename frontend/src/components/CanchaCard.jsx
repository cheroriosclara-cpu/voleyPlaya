import React from 'react';

function CanchaCard({ cancha, onEdit, onDelete }) {
  return (
    <div className="cancha-card">
      <div className="cancha-card-header">
        <h3>{cancha.nombre}</h3>
        <span className={`badge ${cancha.estado ? cancha.estado.toLowerCase() : ''}`}>
          {cancha.estado}
        </span>
      </div>
      <div className="cancha-card-body">
        <p><strong>ID:</strong> {cancha.id}</p>
        <p><strong>Número:</strong> {cancha.numero}</p>
        <p><strong>Superficie:</strong> {cancha.tipoSuperficie}</p>
      </div>
      <div className="cancha-card-actions">
        <button className="btn btn-edit" onClick={() => onEdit(cancha)}>
          Editar
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(cancha.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CanchaCard;