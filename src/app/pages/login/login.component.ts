import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { LoginService } from '../../services/login/login.service';
import {Router} from '@angular/router';
import { ResponseI } from '../../models/response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm = new FormGroup({
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
})
  constructor(private api:LoginService, private router:Router){}
  

  ngOnInit():void{

  }

  onLogin(form: any){
    this.api.loginByEmail(form).subscribe(data=>{
      let dataResponse:ResponseI = data;
      if(dataResponse.status == "OK"){
        localStorage.setItem("user",dataResponse.data);
        this.router.navigate(['home']);
      }
    })
  }
}
