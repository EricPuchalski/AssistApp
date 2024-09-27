package ar.assist.service.impl;

import ar.assist.model.Estudiante;
import ar.assist.repository.EstudianteRepository;
import ar.assist.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImpl implements EstudianteService {
    @Autowired
    private EstudianteRepository estudianteRepository;

    @Override
    public Estudiante create(Estudiante estudiante) {
        estudiante.setActive(true);
        return estudianteRepository.save(estudiante);

    }

    @Override
    public Estudiante update(Long id, Estudiante estudiante) {
        // Verificar si el estudiante existe antes de actualizar
        return estudianteRepository.findById(id).map(est -> {
            est.setNombre(estudiante.getNombre());
            est.setApellido(estudiante.getApellido());
            est.setDni(estudiante.getDni());
            return estudianteRepository.save(est);
        }).orElseThrow(() -> new RuntimeException("Estudiante no encontrado con ID: " + id));
    }

    @Override
    public Optional<Estudiante> findOneById(Long id) {
        return estudianteRepository.findById(id);
    }

    @Override
    public Optional<Estudiante> findByDni(String dni) {
        return estudianteRepository.findByDni(dni);
    }

    @Override
    public List<Estudiante> findAll() {
        return estudianteRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        estudianteRepository.deleteById(id);

    }

    public List<Estudiante> findByActiveTrue(){
        return estudianteRepository.findByActiveTrue();
    }

    public Estudiante disableStudent(String dni) {
        // Buscar el estudiante por id
        Optional<Estudiante> estudianteOptional = estudianteRepository.findByDni(dni);

        // Verificar si el estudiante existe
        if (estudianteOptional.isPresent()) {
            Estudiante estudiante = estudianteOptional.get();
            // Cambiar el campo 'active' a false
            estudiante.setActive(false);
            // Guardar el estudiante actualizado
            return estudianteRepository.save(estudiante);
        } else {
            throw new IllegalArgumentException("Estudiante no encontrado con dni: " + dni);
        }
    }


}
