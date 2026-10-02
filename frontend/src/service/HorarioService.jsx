const API_URL = 'http://localhost:8080/api/horario'; // Cambia por tu URL backend

export const HorarioService = {
  // Obtener todos los horarios
  getAllHorarios: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener horarios');
    return await res.json();
  },

  // Obtener horarios por ID de cancha
  getHorariosByCancha: async (canchaId) => {
    const res = await fetch(`${API_URL}/cancha/${canchaId}`);
    if (!res.ok) throw new Error('Error al obtener horarios de la cancha');
    return await res.json();
  },

  // Crear un nuevo horario
  createHorario: async (horarioData) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(horarioData),
    });
    if (!res.ok) throw new Error('Error al guardar el horario');
    return await res.json();
  },

  // Actualizar horario existente
  updateHorario: async (id, horarioData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(horarioData),
    });
    if (!res.ok) throw new Error('Error al actualizar el horario');
    return await res.json();
  },

  // Eliminar horario
  deleteHorario: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar el horario');
    return true;
  }
};