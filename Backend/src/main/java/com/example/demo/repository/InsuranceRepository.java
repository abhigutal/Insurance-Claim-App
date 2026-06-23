package com.example.demo.repository;

import com.example.demo.model.Insurance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface InsuranceRepository
        extends JpaRepository<Insurance,Integer> {


    Optional<Insurance> findByEmail(String email);


    Optional<Insurance> findByUsername(String username);


    Optional<Insurance> findByMobile(String mobile);

}