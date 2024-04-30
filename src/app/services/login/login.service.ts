import { Injectable } from "@angular/core";
import { Login} from '../../models/login.model';
import { User } from "../../models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseI } from "../../models/response.model";

@Injectable({
    providedIn: "root"
})
export class LoginService{
    url:string = "http://localhost:8085/app-tasks/api/";
    
    constructor(private http:HttpClient){}
    
    loginByEmail(form:Login): Observable<ResponseI>{
        let direccion = this.url+"auth/login";
        return this.http.post<ResponseI>(direccion,form)
    }
    registerUser(form:User): Observable<ResponseI>{
        let direccion = this.url+"auth/register";
        return this.http.post<ResponseI>(direccion,form)
    }
}