package com.Trabjo.Natymoo.repository;

import com.Trabjo.Natymoo.entiti.DetalleCarrito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, Integer> {
    List<DetalleCarrito> findByCarritoCompras_Id(Integer idCarrito);

}
