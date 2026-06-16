package com.Trabjo.Natymoo.entiti;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "orden_compra")
public class OrdenCompra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_pago")
    private Pago pago;

    @ManyToOne
    @JoinColumn(name = "id_cupon")
    private Cupon cupon;

    private String estado;

    @Column(name = "fecha_entrega")
    private LocalDate fechaEntrega;

    @Column(name = "precio_total")
    private BigDecimal precioTotal;
}
