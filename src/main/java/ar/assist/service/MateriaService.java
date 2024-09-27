package ar.assist.service;

import ar.assist.model.Materia;

import java.util.List;
import java.util.Optional;

public interface MateriaService {
    List<Materia> findAll();
    Optional<Materia> findById(Long id);

    Materia save(Materia materia);
    void deleteById(Long id);
    List<Materia> findByNombre(String nombre);
}
