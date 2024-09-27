package ar.assist.service.impl;

import ar.assist.model.Materia;
import ar.assist.repository.MateriaRepository;
import ar.assist.service.MateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MateriaServiceImpl implements MateriaService {
    private final MateriaRepository materiaRepository;

    @Autowired
    public MateriaServiceImpl(MateriaRepository materiaRepository) {
        this.materiaRepository = materiaRepository;
    }

    @Override
    public List<Materia> findAll() {
        return materiaRepository.findAll();
    }

    @Override
    public Optional<Materia> findById(Long id) {
        return materiaRepository.findById(id);
    }

    @Override
    public Materia save(Materia materia) {
        return materiaRepository.save(materia);
    }

    @Override
    public void deleteById(Long id) {
        materiaRepository.deleteById(id);
    }

    @Override
    public List<Materia> findByNombre(String nombre) {
        return materiaRepository.findByNombre(nombre);
    }
}
