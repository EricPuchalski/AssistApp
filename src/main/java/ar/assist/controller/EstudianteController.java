package ar.assist.controller;

import ar.assist.model.Estudiante;
import ar.assist.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class EstudianteController {
    @Autowired
    private EstudianteService estudianteService;

    @PostMapping
    public ResponseEntity<Estudiante> create(@RequestBody Estudiante estudiante) {
        Estudiante nuevoEstudiante = estudianteService.create(estudiante);
        return new ResponseEntity<>(nuevoEstudiante, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> update(
            @PathVariable Long id,
            @RequestBody Estudiante estudiante) {
        Estudiante estudianteActualizado = estudianteService.update(id, estudiante);
        return new ResponseEntity<>(estudianteActualizado, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> findOneById(@PathVariable Long id) {
        Optional<Estudiante> estudiante = estudianteService.findOneById(id);
        return estudiante.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<Estudiante> findByDni(@PathVariable String dni) {
        Optional<Estudiante> estudiante = estudianteService.findByDni(dni);
        return estudiante.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<List<Estudiante>> findAllActive() {
        List<Estudiante> estudiantes = estudianteService.findByActiveTrue();
        return new ResponseEntity<>(estudiantes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        estudianteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/disable/{dni}")
    public ResponseEntity<Estudiante> disableStudent(@PathVariable String dni) {
        Estudiante estudianteDesactivado = estudianteService.disableStudent(dni);
        return new ResponseEntity<>(estudianteDesactivado, HttpStatus.OK);
    }
}
