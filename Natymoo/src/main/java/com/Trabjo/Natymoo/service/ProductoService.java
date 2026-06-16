package com.Trabjo.Natymoo.service;

import com.Trabjo.Natymoo.dto.ProductoRequest;
import com.Trabjo.Natymoo.dto.ProductoResponse;
import com.Trabjo.Natymoo.entiti.Categoria;
import com.Trabjo.Natymoo.entiti.Producto;
import com.Trabjo.Natymoo.repository.CategoriaRepository;
import com.Trabjo.Natymoo.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoResponse crear(ProductoRequest request) {
        Categoria categoria = categoriaRepository.findById(request.getIdCategoria())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Producto producto = new Producto();
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setStock(request.getStock());
        producto.setPrecio(request.getPrecio());
        producto.setUrlImagen(request.getUrlImagen());
        producto.setCategoria(categoria);

        Producto guardado = productoRepository.save(producto);
        return toResponse(guardado);
    }

    public List<ProductoResponse> listarTodos() {
        return productoRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductoResponse buscarPorId(Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return toResponse(producto);
    }

    public ProductoResponse actualizar(Integer id, ProductoRequest request) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Categoria categoria = categoriaRepository.findById(request.getIdCategoria())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setStock(request.getStock());
        producto.setPrecio(request.getPrecio());
        producto.setUrlImagen(request.getUrlImagen());
        producto.setCategoria(categoria);

        return toResponse(productoRepository.save(producto));
    }

    public String eliminar(Integer id) {
        if (!productoRepository.existsById(id)) {
            throw new RuntimeException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
        return "Producto eliminado";
    }

    private ProductoResponse toResponse(Producto producto) {
        ProductoResponse response = new ProductoResponse();
        response.setId(producto.getId());
        response.setNombre(producto.getNombre());
        response.setDescripcion(producto.getDescripcion());
        response.setStock(producto.getStock());
        response.setPrecio(producto.getPrecio());
        response.setUrlImagen(producto.getUrlImagen());
        response.setCategoria(producto.getCategoria().getNombre());
        return response;
    }
}