package com.demo.hospitalmanagement;

import java.util.List;

import com.demo.hospitalmanagement.dto.MPatientDto;
import com.demo.hospitalmanagement.dto.ResponseDto;
import com.demo.hospitalmanagement.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hm-api")
@CrossOrigin
public class HospitalRestController {
    
    @Autowired
    PatientService patientService;

    // endpoint for getting patient by id
    @GetMapping("patient-by-id")
    public ResponseEntity<MPatientDto> patientById(@RequestParam Integer patientId){

        MPatientDto mPatientDto = patientService.getPatientById(patientId);

        return new ResponseEntity<MPatientDto>(mPatientDto, HttpStatus.OK);
    }

    // endpoint for getting all patients
    @GetMapping("all-patients")
    public ResponseEntity<List<MPatientDto>> allpatients(){

        List<MPatientDto> mPatientDtos = patientService.getAllPatients();

        return new ResponseEntity<List<MPatientDto>>(mPatientDtos, HttpStatus.OK);
    }


    // endpoint for adding new patient
    @PostMapping("add-new-patient")
    public ResponseEntity<ResponseDto> addnewpatient(@RequestBody MPatientDto mPatientDto){

        ResponseDto responseDto = patientService.addNewPatient(mPatientDto);

        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }



    // endpoint for deleting patient details
    @DeleteMapping("delete-patient-details")
    public ResponseEntity<ResponseDto> deletepatientdetails(@RequestParam Integer patientId){

        ResponseDto responseDto = patientService.deletePatientDetails(patientId);

        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }



    // endpoint for updating patient details
    @PutMapping("update-patient-details")
    public ResponseEntity<ResponseDto> updatepatientdetails(@RequestBody MPatientDto mPatientDto){

        ResponseDto responseDto = patientService.updatePatientDetails(mPatientDto);

        return new ResponseEntity<ResponseDto>(responseDto, HttpStatus.OK);
    }
}
