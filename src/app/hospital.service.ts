import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MPatientDtoC } from './models';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public url: string = ''

    constructor(private http: HttpClient){
      this.url = environment.API_URL + 'hm-api/'
    }

    getAllPatients(){
      return this.http.get<any>(this.url + 'all-patients')
    }

    deletePatientDetails(patientId: number){
      return this.http.delete<any>(this.url + 'delete-patient-details?patientId' + patientId)
    }

    addNewPatient(mPatientDto: MPatientDtoC): Observable<any>{
      return this.http.post<any>(this.url + 'add-new-patient', mPatientDto)
    }
}
