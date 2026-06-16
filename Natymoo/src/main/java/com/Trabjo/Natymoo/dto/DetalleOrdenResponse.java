package com.Trabjo.Natymoo.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DetalleOrdenResponse {
    private String nombreProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;
}