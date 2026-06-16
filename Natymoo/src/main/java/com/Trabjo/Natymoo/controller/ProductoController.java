package com.Trabjo.Natymoo.controller;

import com.Trabjo.Natymoo.dto.ProductoRequest;
import com.Trabjo.Natymoo.dto.ProductoResponse;
import com.Trabjo.Natymoo.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping("/admin/producto")
    public ResponseEntity<ProductoResponse> crear(@RequestBody ProductoRequest request) {
        return ResponseEntity.ok(productoService.crear(request));
    }

    @GetMapping("/productos")
    public ResponseEntity<List<ProductoResponse>> listarTodos() {
        return ResponseEntity.ok(productoService.listarTodos());
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<ProductoResponse> buscarPorId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productoService.buscarPorId(id));
    }

    @PutMapping("/admin/producto/{id}")
    public ResponseEntity<ProductoResponse> actualizar(
            @PathVariable("id") Integer id,
            @RequestBody ProductoRequest request) {
        System.out.println(">>> ID recibido: " + id); // log temporal
        return ResponseEntity.ok(productoService.actualizar(id, request));
    }

    @DeleteMapping("/admin/producto/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(productoService.eliminar(id));
    }
}