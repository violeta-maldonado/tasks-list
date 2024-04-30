import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from '@angular/core';
import { ResponseI } from "../../models/response.model";

@Injectable({
    providedIn: "root"
})
export class UserService{
    private http = inject(HttpClient);
    private path:string = "http://localhost:8085/app-tasks/api/user";
    
    constructor(){}

    getAll(){
        return this.http.get<ResponseI>(this.path+'/all')
    }
    
}