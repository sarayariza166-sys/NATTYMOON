package com.Trabjo.Natymoo.dto;

import lombok.Data;

@Data
public class AgregarProductoRequest {
    private Integer idUsuario;
    private Integer idProducto;
    private Integer cantidad;
}
