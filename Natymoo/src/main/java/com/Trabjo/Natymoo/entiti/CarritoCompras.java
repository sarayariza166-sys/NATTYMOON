package com.Trabjo.Natymoo.entiti;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "carrito_compras")
public class CarritoCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
}
