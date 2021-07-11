import { Component, OnInit } from '@angular/core';
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

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.newPatient)
    this.hospitalService.addNewPatient(this.newPatient).subscribe(
      (success) => {
        this.response = success
        if(this.response.status){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: this.response.message,
            timer: 1300
          })
        }
        else{
          Swal.fire({
            icon: 'info',
            text: this.response.message,
            timer: 1300
          })
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Somthing is wrong.." ,
          timer: 1300
        })
      }
    )
  }

}
