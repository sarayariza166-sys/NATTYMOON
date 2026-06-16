package com.Trabjo.Natymoo.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrdenResponse {
    private Integer idOrden;
    private String estado;
    private BigDecimal precioTotal;
    private LocalDate fechaEntrega;
    private String metodoPago;
    private String cuponAplicado;
    private List<DetalleOrdenResponse> productos;
}