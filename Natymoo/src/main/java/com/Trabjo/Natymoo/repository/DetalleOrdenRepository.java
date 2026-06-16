package com.Trabjo.Natymoo.repository;

import com.Trabjo.Natymoo.entiti.DetalleOrden;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetalleOrdenRepository extends JpaRepository<DetalleOrden, Integer> {
    List<DetalleOrden> findByOrdenCompra_Id(Integer idOrden);
}
