package com.Trabjo.Natymoo.dto;

import lombok.Data;

@Data
public class ProductoRequest {
    private String nombre;
    private String descripcion;
    private Integer stock;
    private Integer precio;
    private String urlImagen;
    private Integer idCategoria;
}
