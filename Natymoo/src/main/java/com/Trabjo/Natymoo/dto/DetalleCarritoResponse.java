package com.Trabjo.Natymoo.dto;

import lombok.Data;

@Data
public class DetalleCarritoResponse {
    private Integer idDetalle;
    private String nombreProducto;
    private Integer cantidad;
    private Integer precioUnitario;
    private Integer subtotal;
}
