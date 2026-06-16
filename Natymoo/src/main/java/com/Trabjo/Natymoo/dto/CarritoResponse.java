package com.Trabjo.Natymoo.dto;

import lombok.Data;

import java.util.List;

@Data
public class CarritoResponse {
    private Integer idCarrito;
    private List<DetalleCarritoResponse> productos;
    private Integer total;
}
