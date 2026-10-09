
package com.VoleyPlay.backend.repository;

import com.VoleyPlay.backend.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
    List<Horario> findByCanchaId(Long canchaId);
    void deleteByCanchaId(Long canchaId);
}