package ar.assist.controller;

import ar.assist.model.Materia;
import ar.assist.service.MateriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class MateriaController {
    private final MateriaService materiaService;

    @Autowired
    public MateriaController(MateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @GetMapping
    public List<Materia> getAllMaterias() {
        return materiaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> getMateriaById(@PathVariable Long id) {
        return materiaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nombre/{nombre}") // Endpoint para buscar por nombre
    public ResponseEntity<List<Materia>> getMateriasByNombre(@PathVariable String nombre) {
        List<Materia> materias = materiaService.findByNombre(nombre);
        if (materias.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(materias);
    }

    @PostMapping
    public Materia createMateria(@Validated @RequestBody Materia materia) {
        return materiaService.save(materia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMateria(@PathVariable Long id) {
        materiaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
