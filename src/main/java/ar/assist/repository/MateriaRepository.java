package ar.assist.repository;

import ar.assist.model.Estudiante;
import ar.assist.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {
    List<Materia> findByNombre(String nombre);
}
