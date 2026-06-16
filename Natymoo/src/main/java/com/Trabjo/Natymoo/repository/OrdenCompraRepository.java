package com.Trabjo.Natymoo.repository;

import com.Trabjo.Natymoo.entiti.OrdenCompra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenCompraRepository extends JpaRepository<OrdenCompra,Integer> {
    List<OrdenCompra> findByUsuario_Id(Integer idUsuario);
}
