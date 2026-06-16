package com.Trabjo.Natymoo.service;

import com.Trabjo.Natymoo.dto.AgregarProductoRequest;
import com.Trabjo.Natymoo.dto.CarritoResponse;
import com.Trabjo.Natymoo.dto.DetalleCarritoResponse;
import com.Trabjo.Natymoo.entiti.CarritoCompras;
import com.Trabjo.Natymoo.entiti.DetalleCarrito;
import com.Trabjo.Natymoo.entiti.Producto;
import com.Trabjo.Natymoo.entiti.Usuario;
import com.Trabjo.Natymoo.repository.CarritoComprasRepository;
import com.Trabjo.Natymoo.repository.DetalleCarritoRepository;
import com.Trabjo.Natymoo.repository.ProductoRepository;
import com.Trabjo.Natymoo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoComprasRepository carritoRepository;
    private final DetalleCarritoRepository detalleRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public String agregarProducto(AgregarProductoRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        CarritoCompras carrito = carritoRepository.findByUsuario_Id(request.getIdUsuario())
                .orElseGet(() -> {
                    CarritoCompras nuevo = new CarritoCompras();
                    nuevo.setUsuario(usuario);
                    return carritoRepository.save(nuevo);
                });

        Producto producto = productoRepository.findById(request.getIdProducto())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (producto.getStock() < request.getCantidad()) {
            throw new RuntimeException("Stock insuficiente");
        }

        DetalleCarrito detalle = new DetalleCarrito();
        detalle.setCarritoCompras(carrito);
        detalle.setProducto(producto);
        detalle.setCantidad(request.getCantidad());

        detalleRepository.save(detalle);

        return "Producto agregado al carrito";
    }

    public CarritoResponse verCarrito(Integer idUsuario) {

        CarritoCompras carrito = carritoRepository.findByUsuario_Id(idUsuario)
                .orElseThrow(() -> new RuntimeException("El usuario no tiene carrito"));

        List<DetalleCarrito> detalles = detalleRepository.findByCarritoCompras_Id(carrito.getId());

        List<DetalleCarritoResponse> productosResponse = detalles.stream()
                .map(d -> {
                    DetalleCarritoResponse dr = new DetalleCarritoResponse();
                    dr.setIdDetalle(d.getId());
                    dr.setNombreProducto(d.getProducto().getNombre());
                    dr.setCantidad(d.getCantidad());
                    dr.setPrecioUnitario(d.getProducto().getPrecio());
                    dr.setSubtotal(d.getCantidad() * d.getProducto().getPrecio());
                    return dr;
                }).toList();

        Integer total = productosResponse.stream()
                .mapToInt(DetalleCarritoResponse::getSubtotal)
                .sum();

        CarritoResponse response = new CarritoResponse();
        response.setIdCarrito(carrito.getId());
        response.setProductos(productosResponse);
        response.setTotal(total);

        return response;
    }

    public String eliminarProducto(Integer idDetalle) {
        if (!detalleRepository.existsById(idDetalle)) {
            throw new RuntimeException("Detalle no encontrado");
        }
        detalleRepository.deleteById(idDetalle);
        return "Producto eliminado del carrito";
    }
}