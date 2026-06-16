package com.Trabjo.Natymoo.controller;

import com.Trabjo.Natymoo.dto.AgregarProductoRequest;
import com.Trabjo.Natymoo.dto.CarritoResponse;
import com.Trabjo.Natymoo.service.CarritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @PostMapping("/agregar")
    public ResponseEntity<String> agregarProducto(@RequestBody AgregarProductoRequest request) {
        return ResponseEntity.ok(carritoService.agregarProducto(request));
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<CarritoResponse> verCarrito(@PathVariable("idUsuario") Integer idUsuario) {
        return ResponseEntity.ok(carritoService.verCarrito(idUsuario));
    }

    @DeleteMapping("/eliminar/{idDetalle}")
    public ResponseEntity<String> eliminarProducto(@PathVariable("idDetalle") Integer idDetalle) {
        return ResponseEntity.ok(carritoService.eliminarProducto(idDetalle));
    }
}