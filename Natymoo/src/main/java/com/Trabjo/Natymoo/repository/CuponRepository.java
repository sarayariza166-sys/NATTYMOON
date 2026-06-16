package com.Trabjo.Natymoo.repository;

import com.Trabjo.Natymoo.entiti.Cupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CuponRepository extends JpaRepository<Cupon,Integer> {
    Optional<Cupon> findByCodigo(String codigo);
}
