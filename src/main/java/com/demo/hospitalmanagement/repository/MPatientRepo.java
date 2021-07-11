package com.demo.hospitalmanagement.repository;

import com.demo.hospitalmanagement.entity.MPatientEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MPatientRepo extends JpaRepository<MPatientEntity, Integer>{

    public MPatientEntity findByPatientId(Integer patientId);
}
