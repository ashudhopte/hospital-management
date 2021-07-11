package com.demo.hospitalmanagement.entity;

import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

import org.springframework.lang.NonNull;

@Entity
@Table(name = "m_patient")
public class MPatientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id", unique = true)
    @NonNull
    Integer patientId;

    @Column(name = "first_name")
    @NonNull
    @NotBlank(message = "First Name should not be blank.")
    String firstName;

    @Column(name = "last_name")
    @NonNull
    @NotBlank(message = "Last Name should not be blank.")
    String lastName;

    @Column(name = "age")
    @Positive(message = "Age should be positive.")
    BigInteger age;

    @Column(name = "identity_type")
    @NonNull
    String identityType;

    @Column(name = "identity_number", unique = true)
    @NonNull
    @NotBlank(message = "Identity Number should not be blank.")
    String identityNumber;

    @Column(name = "contact_number")
    @Positive
    BigInteger contactNumber;

    @Column(name = "is_covid_positive")
    @NonNull
    Boolean isCovidPositive;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_modified")
    Date lastModified;

    

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

    
}
