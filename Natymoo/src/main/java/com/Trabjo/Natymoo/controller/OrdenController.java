package com.Trabjo.Natymoo.controller;

import com.Trabjo.Natymoo.dto.CrearOrdenRequest;
import com.Trabjo.Natymoo.dto.OrdenResponse;
import com.Trabjo.Natymoo.service.OrdenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/orden")
@RequiredArgsConstructor
public class OrdenController {

    private final OrdenService ordenService;

    @PostMapping("/crear")
    public ResponseEntity<OrdenResponse> crearOrden(@RequestBody CrearOrdenRequest request) {
        return ResponseEntity.ok(ordenService.crearOrden(request));
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<List<OrdenResponse>> verOrdenes(@PathVariable("idUsuario") Integer idUsuario) {
        return ResponseEntity.ok(ordenService.verOrdenes(idUsuario));
    }
}