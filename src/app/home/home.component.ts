import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HospitalService } from '../hospital.service';
import { MPatientDtoC, ResponseDtoC } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public patients: MPatientDtoC[] = []
  public patientToDelete: MPatientDtoC = new MPatientDtoC()
  public deletePatientId: number
  public loading: boolean = false
  public response: ResponseDtoC = new ResponseDtoC()

  constructor(
    private hospitalService: HospitalService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.allPatients()
  }

  editDetails(i: number){

    //navigating to AddNewComponent for updating details
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'patientId': this.patients[i].patientId
      }
    };

    this.router.navigate(['add-new'], navigationExtras)
  }

  // alert for delete patient
  delete(i: number){

    this.patientToDelete = this.patients[i]

    Swal.fire({
      icon: 'warning',
      title: 'Delete',
      text: 'You sure want to delete details of ' + this.patientToDelete.firstName + ' ' + this.patientToDelete.lastName + ' ?',
      showCancelButton: true,
      showConfirmButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: '<i class="fa fa-trash"></i> Delete Patient Details',
      cancelButtonText: 'Cancel'
    })
    .then((result) =>{
      if(result.isConfirmed){
        this.deletePatientId = this.patientToDelete.patientId
        this.deletePatient()
      }
    })
  }

  //api-call for delete patient
  deletePatient(){
    
    this.hospitalService.deletePatientDetails(this.patientToDelete.patientId).subscribe(
      (success) =>{
        this.response = success
        if(this.response.status){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: this.response.message,
            timer: 1500
          })

          this.allPatients()
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: this.response.message,
            timer: 1500
          })
        }
      },
      (error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          html: 'failed...',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    )
  }

  // api-call for getting all patients
  allPatients(){
    this.loading = true

    this.hospitalService.getAllPatients().subscribe(
      (success) => {
        this.patients = success
        this.loading = false
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong!',
          html: 'failed...',
          showConfirmButton: false,
          timer: 1500,
        })
        this.loading = false
      }
    )
  }
}
