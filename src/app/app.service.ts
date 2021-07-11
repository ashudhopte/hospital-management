import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AppService{

    public url: string = ''

    constructor(private http: HttpClient){
        this.url = environment.API_URL + 'hm-api/'
    }

    getAllPatients(){
        return this.http.get<any>(this.url + 'all-patients')
    }
}