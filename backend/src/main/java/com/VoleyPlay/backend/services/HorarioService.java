package com.VoleyPlay.backend.services;

import com.VoleyPlay.backend.model.Horario;
import com.VoleyPlay.backend.repository.HorarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    // --- 2 GETs ---
    public List<Horario> obtenerTodos() {
        return horarioRepository.findAll();
    }

    public List<Horario> obtenerPorCancha(Long canchaId) {
        return horarioRepository.findByCanchaId(canchaId);
    }

    // --- 2 POSTs ---
    public Horario guardarUno(Horario horario) {
        return horarioRepository.save(horario);
    }

    public List<Horario> guardarVarios(List<Horario> horarios) {
        return horarioRepository.saveAll(horarios);
    }

    // --- 2 DELETEs ---
    public void eliminarPorId(Long id) {
        horarioRepository.deleteById(id);
    }

    public void eliminarPorCancha(Long canchaId) {
        horarioRepository.deleteByCanchaId(canchaId);
    }
}