package ar.assist.service;

import ar.assist.dto.CreateInscription;
import ar.assist.model.Inscripcion;

import java.util.List;

public interface InscripcionService {
    List<Inscripcion> findAll();

    Inscripcion crearInscripcion(CreateInscription createInscription);

}
