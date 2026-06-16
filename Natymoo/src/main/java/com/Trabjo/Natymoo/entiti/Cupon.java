package com.Trabjo.Natymoo.entiti;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cupon")
public class Cupon {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    private String codigo;

    private String descripcion;

    @Column(name = "valor_descuento")
    private BigDecimal valorDescuento;

    private String estado;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
}
