package com.Trabjo.Natymoo.entiti;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "producto")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String descripcion;

    private Integer stock;

    private Integer precio;

    @Column(name = "url_imagen")
    private String urlImagen;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;
}
