package com.Trabjo.Natymoo.repository;

import com.Trabjo.Natymoo.entiti.CarritoCompras;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoComprasRepository extends JpaRepository<CarritoCompras, Integer> {
    Optional<CarritoCompras> findByUsuario_Id(Integer idUsuario);
}
