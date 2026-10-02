import React from 'react';
import '../styles/horario.css';

export const HorarioCard = ({ horario, onDelete, onToggleDisponible }) => {
  const { id, horaInicio, horaFin, disponible, precio, diaSemana } = horario;

  return (
    <div className={`horario-card ${disponible ? 'disponible' : 'ocupado'}`}>
      <div className="horario-header">
        <span className="horario-dia">{diaSemana || 'Todos los días'}</span>
        <span className={`badge ${disponible ? 'badge-success' : 'badge-danger'}`}>
          {disponible ? 'Disponible' : 'Reservado'}
        </span>
      </div>

      <div className="horario-body">
        <p className="horario-time">
          🕒 {horaInicio} - {horaFin}
        </p>
        {precio && <p className="horario-precio">💰 S/. {precio}</p>}
      </div>

      <div className="horario-actions">
        {onToggleDisponible && (
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onToggleDisponible(id, !disponible)}
          >
            {disponible ? 'Marcar Ocupado' : 'Marcar Disponible'}
          </button>
        )}
        {onDelete && (
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};