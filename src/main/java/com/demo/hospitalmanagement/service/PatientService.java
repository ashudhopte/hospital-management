package com.demo.hospitalmanagement.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.demo.hospitalmanagement.dto.MPatientDto;
import com.demo.hospitalmanagement.dto.ResponseDto;
import com.demo.hospitalmanagement.entity.MPatientEntity;
import com.demo.hospitalmanagement.repository.MPatientRepo;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    
    @Autowired
    MPatientRepo mPatientRepo;

    //Getting patient by id
    public MPatientDto getPatientById(Integer patientId){

        MPatientEntity mPatientEntity = mPatientRepo.findByPatientId(patientId);

        MPatientDto mPatientDto = new MPatientDto();

        if(mPatientEntity != null){
            BeanUtils.copyProperties(mPatientEntity, mPatientDto);
        }   

        return mPatientDto;
    }

    // Getting all the patient details
    public List<MPatientDto> getAllPatients(){

        // finding all entries
        List<MPatientEntity> mPatientEntities = mPatientRepo.findAll();

        List<MPatientDto> mPatientDtos = new ArrayList<>();

        // converting all entites to dtos
        for(MPatientEntity mPatientEntity: mPatientEntities){

            MPatientDto mPatientDto = new MPatientDto();

            BeanUtils.copyProperties(mPatientEntity, mPatientDto);

            mPatientDtos.add(mPatientDto);
        }

        return mPatientDtos;
    }


    // Adding new patient to the database
    public ResponseDto addNewPatient(MPatientDto mPatientDto){

        ResponseDto responseDto = new ResponseDto();

        // checking is patient dto is null
        if(mPatientDto == null){
            responseDto.setMessage("Patient Details Not Saved.");
            responseDto.setStatus(false);

            return responseDto;
        }

        // checking is required details are null
        if(mPatientDto.getFirstName() == null || mPatientDto.getIdentityNumber() == null ||
        mPatientDto.getIdentityType() == null ||
        mPatientDto.getLastName() == null){
            responseDto.setMessage("Patient Details Not Saved.");
            responseDto.setStatus(false);

            return responseDto;
        }

        MPatientEntity mPatientEntity = new MPatientEntity();

        // copying properties from dto to entity
        BeanUtils.copyProperties(mPatientDto, mPatientEntity);
        mPatientEntity.setLastModified(new Date());
        mPatientEntity.setAdmittedOn(new Date());

        // saving details to database
        mPatientRepo.save(mPatientEntity);

        responseDto.setMessage("Patient Details Saved SuccessFully.");
        responseDto.setStatus(true);

        return responseDto;
    }

    // deleting patient details from the database
    public ResponseDto deletePatientDetails(Integer patientId){

        ResponseDto responseDto = new ResponseDto();

        // checking if patient id is 0
        if(patientId == 0){
            responseDto.setMessage("Patient Details Not Deleted.");
            responseDto.setStatus(false);

            return responseDto;
        }

        // finding the patient by patient id
        MPatientEntity mPatientEntity = mPatientRepo.findByPatientId(patientId);

        // checking is patient exists
        if(mPatientEntity == null){
            responseDto.setMessage("No Such Patient Found");
            responseDto.setStatus(false);

            return responseDto;
        }

        // deleting the patient
        mPatientRepo.delete(mPatientEntity);

        responseDto.setMessage("Patient Details Deleted SuccessFully.");
        responseDto.setStatus(true);

        return responseDto;
    } 
    
    // updating the patient details
    public ResponseDto updatePatientDetails(MPatientDto mPatientDto){

        ResponseDto responseDto = new ResponseDto();

         // checking if patient dto is null
        if(mPatientDto == null || mPatientDto.getPatientId() == 0){
            responseDto.setMessage("Patient Details Not Updated.");
            responseDto.setStatus(false);

            return responseDto;
        }

        // finding the patient by patient id
        MPatientEntity mPatientEntity = mPatientRepo.findByPatientId(mPatientDto.getPatientId());

        // checking is patient exists
        if(mPatientEntity == null){
            responseDto.setMessage("No Such Patient Found");
            responseDto.setStatus(false);

            return responseDto;
        }

        mPatientEntity.setAge(mPatientDto.getAge());
        mPatientEntity.setContactNumber(mPatientDto.getContactNumber());
        mPatientEntity.setFirstName(mPatientDto.getFirstName());
        mPatientEntity.setIdentityNumber(mPatientDto.getIdentityNumber());
        mPatientEntity.setIdentityType(mPatientDto.getIdentityNumber());
        mPatientEntity.setIsCovidPositive(mPatientDto.getIsCovidPositive());
        mPatientEntity.setLastModified(new Date());
        mPatientEntity.setLastName(mPatientDto.getLastName());
        
        // saving details to database
        mPatientRepo.save(mPatientEntity);

        responseDto.setMessage("Patient Details Updated SuccessFully.");
        responseDto.setStatus(true);

        return responseDto;
    }
}
