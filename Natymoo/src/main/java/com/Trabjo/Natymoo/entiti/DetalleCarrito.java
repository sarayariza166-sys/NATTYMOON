package com.Trabjo.Natymoo.entiti;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "detalle_carrito")
public class DetalleCarrito {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_carrito_compras")
    private CarritoCompras carritoCompras;

    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Producto producto;

    private Integer cantidad;

}
