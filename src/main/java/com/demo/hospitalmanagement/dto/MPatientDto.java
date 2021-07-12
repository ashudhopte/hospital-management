package com.demo.hospitalmanagement.dto;

import java.math.BigInteger;
import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.springframework.lang.NonNull;

public class MPatientDto {
    
    Integer patientId;
    String firstName;
    String lastName;
    BigInteger age;
    String identityType;
    String identityNumber;
    BigInteger contactNumber;
    Boolean isCovidPositive;
    Date lastModified;
    Date admittedOn;
    

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public BigInteger getAge() {
        return age;
    }

    public void setAge(BigInteger age) {
        this.age = age;
    }

    public String getIdentityType() {
        return identityType;
    }

    public void setIdentityType(String identityType) {
        this.identityType = identityType;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public Boolean getIsCovidPositive() {
        return isCovidPositive;
    }

    public void setIsCovidPositive(Boolean isCovidPositive) {
        this.isCovidPositive = isCovidPositive;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public BigInteger getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(BigInteger contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Date getAdmittedOn() {
        return admittedOn;
    }

    public void setAdmittedOn(Date admittedOn) {
        this.admittedOn = admittedOn;
    }

    
}
