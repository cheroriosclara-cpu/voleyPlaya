import axios from 'axios';

// Si VITE_API_URL es 'https://voleyplaya-production.up.railway.app/api',
// se concatenará correctamente como 'https://voleyplaya-production.up.railway.app/api/canchas'
const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/cancha`;
export const listarCanchas = () => axios.get(BASE_URL);
export const buscarCanchaPorId = (id) => axios.get(`${BASE_URL}/${id}`);
export const guardarCancha = (cancha) => axios.post(BASE_URL, cancha);
export const actualizarCancha = (id, cancha) => axios.put(`${BASE_URL}/${id}`, cancha);
export const eliminarCancha = (id) => axios.delete(`${BASE_URL}/${id}`); 