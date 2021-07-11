import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { HospitalService } from '../hospital.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { MPatientDtoC, ResponseDtoC } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public patients: MPatientDtoC[] = []
  public patientToDelete: MPatientDtoC = new MPatientDtoC()
  public deletePatientId: number = 0
  public loading: boolean = false
  public response: ResponseDtoC = new ResponseDtoC()
  modalRef: BsModalRef

  constructor(
    private hospitalService: HospitalService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    this.allPatients()
  }

  openInfoModal(i: number){
    const initialState = {
      patient: this.patients[i]
    }
    this.modalRef = this.modalService.show(InfoModalComponent, {
      initialState,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-xl',
    })
    this.modalRef.content.closeBtnName = 'Close'
  }

  openEditModal(i: number){
    const initialState = {
      patient: this.patients[i]
    }
    this.modalRef = this.modalService.show(EditModalComponent, {
      initialState,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-xl',
    })
    this.modalRef.content.closeBtnName = 'Close'
    // this.modalRef.content.messageEvent.subscribe((data) => {
    //   console.log(data);
    //   this.viewDriverRewards[i] = data.driverReward;
    // });
  }

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

  deletePatient(){
    
    this.hospitalService.deletePatientDetails(this.deletePatientId).subscribe(
      (success) =>{
        this.response = success
        if(this.response.status){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: this.response.message,
            timer: 1500
          })
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
