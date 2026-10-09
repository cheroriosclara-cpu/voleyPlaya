import React from 'react';

export const HorarioCard = ({ horario, onDelete, onToggleDisponible }) => {
  const { id, horaInicio, horaFin, disponible, fecha } = horario;

  return (
    <div className="horario-card" style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
      <h3>Horario #{id}</h3>
      {fecha && <p><strong>Fecha:</strong> {fecha}</p>}
      <p><strong>Hora:</strong> {horaInicio} - {horaFin}</p>
      <p>
        <strong>Estado:</strong>{' '}
        <span style={{ color: disponible ? 'green' : 'red' }}>
          {disponible ? 'Disponible' : 'No disponible'}
        </span>
      </p>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => onToggleDisponible(id, !disponible)}
          className="btn btn-secondary"
        >
          {disponible ? 'Marcar Ocupado' : 'Marcar Disponible'}
        </button>

        <button
          onClick={() => onDelete(id)}
          className="btn btn-danger"
          style={{ backgroundColor: '#dc3545', color: '#fff' }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};