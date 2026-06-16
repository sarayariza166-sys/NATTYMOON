package com.Trabjo.Natymoo.dto;

import lombok.Data;

@Data
public class CrearOrdenRequest {
    private Integer idUsuario;
    private String metodoPago;
    private String codigoCupon;
    private Integer diasEntrega;
}
