import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/cancha`;

export const listarPagos = () => axios.get(BASE_URL);
export const buscarPagoPorId = (id) => axios.get(`${BASE_URL}/${id}`);
export const guardarPago = (pago) => axios.post(BASE_URL, pago);
export const actualizarPago = (id, pago) => axios.put(`${BASE_URL}/${id}`, pago);
export const eliminarPago = (id) => axios.delete(`${BASE_URL}/${id}`);