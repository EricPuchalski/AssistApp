package ar.assist.controller;


import ar.assist.dto.CreateInscription;
import ar.assist.model.Inscripcion;
import ar.assist.service.InscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inscriptions")
public class InscripcionController {

    private final InscripcionService inscripcionService;

    @Autowired
    public InscripcionController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
    }

    @PostMapping
    public ResponseEntity<Inscripcion> crearInscripcion(@RequestBody CreateInscription createInscription) {
        Inscripcion nuevaInscripcion = inscripcionService.crearInscripcion(createInscription);
        return ResponseEntity.ok(nuevaInscripcion);
    }

    @GetMapping
    public ResponseEntity<List<Inscripcion>> findAll() {
        List<Inscripcion> inscripciones = inscripcionService.findAll();
        return ResponseEntity.ok(inscripciones);
    }

}
