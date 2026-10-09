package com.VoleyPlay.backend.controller;

import com.VoleyPlay.backend.model.Horario;
import com.VoleyPlay.backend.services.HorarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horario")
@CrossOrigin(origins = "*") // Permite la conexión desde React
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    // 1. GET: Obtener todos
    @GetMapping
    public List<Horario> getAll() {
        return horarioService.obtenerTodos();
    }

    // 2. GET: Obtener por cancha
    @GetMapping("/cancha/{canchaId}")
    public List<Horario> getByCancha(@PathVariable Long canchaId) {
        return horarioService.obtenerPorCancha(canchaId);
    }

    // 1. POST: Crear uno
    @PostMapping
    public Horario create(@RequestBody Horario horario) {
        return horarioService.guardarUno(horario);
    }

    // 2. POST: Crear varios a la vez
    @PostMapping("/batch")
    public List<Horario> createBatch(@RequestBody List<Horario> horarios) {
        return horarioService.guardarVarios(horarios);
    }

    // 1. DELETE: Eliminar por ID
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        horarioService.eliminarPorId(id);
    }

    // 2. DELETE: Eliminar todos los horarios de una cancha
    @DeleteMapping("/cancha/{canchaId}")
    public void deleteByCancha(@PathVariable Long canchaId) {
        horarioService.eliminarPorCancha(canchaId);
    }
}