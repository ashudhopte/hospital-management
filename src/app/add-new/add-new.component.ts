import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HospitalService } from '../hospital.service';
import { MPatientDtoC, ResponseDtoC } from '../models';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  public loading: boolean = false

  public newPatient: MPatientDtoC = new MPatientDtoC()
  public response: ResponseDtoC = new ResponseDtoC()
  public submitDisable: boolean = true
  public patientId: number
  public new: boolean = true

  public identityTypeList: string[] = []

  constructor(
    private hospitalService: HospitalService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //identity type list
    this.identityTypeList.push("Aadhar Card")
    this.identityTypeList.push("Pan Card")
    this.identityTypeList.push("Ration Card")

    //getting patient id from home 
    this.activatedRoute.queryParams.subscribe(params =>{
      if(Number(params['patientId']) > 0){
        this.patientId = Number(params['patientId'])
        this.new = false
        this.getPatient()
      }
    })

    //validations sot submit and update button
    this.onChange()
  }


  //on change event on input fields
  onChange(){
    if(this.newPatient.firstName != '' || this.newPatient.lastName != '' || this.newPatient.contactNumber != null ||
    this.newPatient.identityNumber != '' || this.newPatient.identityType != '' || this.newPatient.age > 0){

      this.submitDisable = false
    }
    else{
      this.submitDisable = true
    }
  }

  getPatient(){

    // api call for patient by patientId
    this.loading = true
    this.hospitalService.getPatientDetails(this.patientId).subscribe(
      (success)=>{
        this.newPatient = success
      },
      (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Somthing is wrong.." ,
          timer: 2000,
          showCancelButton: false,
          showCloseButton: false,
          showConfirmButton: false
        })
      }
    )

    this.loading = false
  }

  submit(){
    //submitting the updated or new patient
      this.hospitalService.addNewPatient(this.newPatient).subscribe(
        (success) => {
          this.response = success
          if(this.response.status){
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: this.response.message,
              timer: 2000,
              showCancelButton: false,
              showCloseButton: false,
              showConfirmButton: false
            })
  
            this.router.navigate(['home'])
          }
          else{
            Swal.fire({
              icon: 'info',
              text: this.response.message,
              timer: 2000,
              showCancelButton: false,
              showCloseButton: false,
              showConfirmButton: false
            })
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Somthing is wrong.." ,
            timer: 2000,
            showCancelButton: false,
            showCloseButton: false,
            showConfirmButton: false
          })
        }
      )
    
  }

}
