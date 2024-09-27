package ar.assist.service;

import ar.assist.model.Estudiante;

import java.util.List;
import java.util.Optional;

public interface EstudianteService {
    Estudiante create(Estudiante estudiante);
    Optional<Estudiante> findByDni(String dni);
    Estudiante update(Long id, Estudiante estudiante);
    Optional<Estudiante> findOneById(Long id);
    List<Estudiante> findAll();
    void delete(Long id);
    List<Estudiante> findByActiveTrue();

    Estudiante disableStudent(String dni);
}
