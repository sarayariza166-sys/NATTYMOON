package com.Trabjo.Natymoo.service;

import com.Trabjo.Natymoo.dto.CrearOrdenRequest;
import com.Trabjo.Natymoo.dto.DetalleOrdenResponse;
import com.Trabjo.Natymoo.dto.OrdenResponse;
import com.Trabjo.Natymoo.entiti.*;
import com.Trabjo.Natymoo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdenService {

    private final OrdenCompraRepository ordenRepository;
    private final DetalleOrdenRepository detalleOrdenRepository;
    private final CarritoComprasRepository carritoRepository;
    private final DetalleCarritoRepository detalleCarritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PagoRepository pagoRepository;
    private final CuponRepository cuponRepository;
    private final ProductoRepository productoRepository;

    public OrdenResponse crearOrden(CrearOrdenRequest request) {

        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        CarritoCompras carrito = carritoRepository.findByUsuario_Id(request.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("El usuario no tiene carrito"));

        List<DetalleCarrito> detallesCarrito = detalleCarritoRepository
                .findByCarritoCompras_Id(carrito.getId());

        if (detallesCarrito.isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        BigDecimal total = detallesCarrito.stream()
                .map(d -> BigDecimal.valueOf(d.getProducto().getPrecio())
                        .multiply(BigDecimal.valueOf(d.getCantidad())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Cupon cupon = null;
        if (request.getCodigoCupon() != null && !request.getCodigoCupon().isBlank()) {
            cupon = cuponRepository.findByCodigo(request.getCodigoCupon())
                    .orElseThrow(() -> new RuntimeException("Cupón no encontrado"));

            if (!cupon.getEstado().equals("ACTIVO")) {
                throw new RuntimeException("Cupón inactivo");
            }

            total = total.subtract(cupon.getValorDescuento());
            if (total.compareTo(BigDecimal.ZERO) < 0) total = BigDecimal.ZERO;
        }

        Pago pago = new Pago();
        pago.setMonto(total);
        pago.setMetodoPago(request.getMetodoPago());
        pago.setFechaPago(LocalDateTime.now());
        pagoRepository.save(pago);

        OrdenCompra orden = new OrdenCompra();
        orden.setUsuario(usuario);
        orden.setPago(pago);
        orden.setCupon(cupon);
        orden.setEstado("PENDIENTE");
        orden.setFechaEntrega(LocalDate.now().plusDays(request.getDiasEntrega()));
        orden.setPrecioTotal(total);
        ordenRepository.save(orden);

        List<DetalleOrdenResponse> detallesResponse = detallesCarrito.stream().map(dc -> {
            DetalleOrden detalle = new DetalleOrden();
            detalle.setOrdenCompra(orden);
            detalle.setProducto(dc.getProducto());
            detalle.setCantidad(dc.getCantidad());
            detalle.setPrecioUnitario(BigDecimal.valueOf(dc.getProducto().getPrecio()));
            detalleOrdenRepository.save(detalle);

            Producto producto = dc.getProducto();
            producto.setStock(producto.getStock() - dc.getCantidad());
            productoRepository.save(producto);

            DetalleOrdenResponse dr = new DetalleOrdenResponse();
            dr.setNombreProducto(producto.getNombre());
            dr.setCantidad(dc.getCantidad());
            dr.setPrecioUnitario(BigDecimal.valueOf(producto.getPrecio()));
            dr.setSubtotal(BigDecimal.valueOf(producto.getPrecio())
                    .multiply(BigDecimal.valueOf(dc.getCantidad())));
            return dr;
        }).toList();

        detalleCarritoRepository.deleteAll(detallesCarrito);

        OrdenResponse response = new OrdenResponse();
        response.setIdOrden(orden.getId());
        response.setEstado(orden.getEstado());
        response.setPrecioTotal(total);
        response.setFechaEntrega(orden.getFechaEntrega());
        response.setMetodoPago(request.getMetodoPago());
        response.setCuponAplicado(cupon != null ? cupon.getCodigo() : "Sin cupón");
        response.setProductos(detallesResponse);

        return response;
    }

    public List<OrdenResponse> verOrdenes(Integer idUsuario) {
        return ordenRepository.findByUsuario_Id(idUsuario).stream().map(orden -> {
            List<DetalleOrden> detalles = detalleOrdenRepository
                    .findByOrdenCompra_Id(orden.getId());

            List<DetalleOrdenResponse> detallesResponse = detalles.stream().map(d -> {
                DetalleOrdenResponse dr = new DetalleOrdenResponse();
                dr.setNombreProducto(d.getProducto().getNombre());
                dr.setCantidad(d.getCantidad());
                dr.setPrecioUnitario(d.getPrecioUnitario());
                dr.setSubtotal(d.getPrecioUnitario()
                        .multiply(BigDecimal.valueOf(d.getCantidad())));
                return dr;
            }).toList();

            OrdenResponse response = new OrdenResponse();
            response.setIdOrden(orden.getId());
            response.setEstado(orden.getEstado());
            response.setPrecioTotal(orden.getPrecioTotal());
            response.setFechaEntrega(orden.getFechaEntrega());
            response.setMetodoPago(orden.getPago().getMetodoPago());
            response.setCuponAplicado(orden.getCupon() != null ?
                    orden.getCupon().getCodigo() : "Sin cupón");
            response.setProductos(detallesResponse);
            return response;
        }).toList();
    }
}