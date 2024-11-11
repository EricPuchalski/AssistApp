package ar.assist.service.impl;

import ar.assist.dto.CreateInscription;
import ar.assist.model.Estudiante;
import ar.assist.model.Inscripcion;
import ar.assist.model.Materia;
import ar.assist.repository.EstudianteRepository;
import ar.assist.repository.InscripcionRepository;
import ar.assist.repository.MateriaRepository;
import ar.assist.service.InscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
class InscripcionServiceImpl implements InscripcionService{
    private final InscripcionRepository inscripcionRepository;
    private final EstudianteRepository estudianteRepository;
    private final MateriaRepository materiaRepository;

    @Autowired
    public InscripcionServiceImpl(InscripcionRepository inscripcionRepository,
                                  EstudianteRepository estudianteRepository,
                                  MateriaRepository materiaRepository) {
        this.inscripcionRepository = inscripcionRepository;
        this.estudianteRepository = estudianteRepository;
        this.materiaRepository = materiaRepository;
    }


    @Override
    public Inscripcion crearInscripcion(CreateInscription createInscription) {
        System.out.println("DNI recibido: " + createInscription.getClientDni()); // Esto imprimirá el DNI recibido

        // Buscar el estudiante por DNI
        Optional<Estudiante> estudianteOpt = estudianteRepository.findByDni(createInscription.getClientDni());
        if (estudianteOpt.isEmpty()) {
            throw new IllegalArgumentException("Estudiante no encontrado con el DNI: " + createInscription.getClientDni());
        }

        // Buscar la materia por ID
        Optional<Materia> materiaOpt = materiaRepository.findById(createInscription.getIdMateria());
        if (materiaOpt.isEmpty()) {
            throw new IllegalArgumentException("Materia no encontrada con el ID: " + createInscription.getIdMateria());
        }

        // Crear la inscripción
        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setEstudiante(estudianteOpt.get());
        inscripcion.setMateria(materiaOpt.get());

        // Guardar la inscripción
        return inscripcionRepository.save(inscripcion);
    }

    @Override
    public List<Inscripcion> findAll() {
        return inscripcionRepository.findAll();
    }
}
