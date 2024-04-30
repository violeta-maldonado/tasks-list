import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { LoginService } from '../../services/login/login.service';
import {Router} from '@angular/router';
import { ResponseI } from '../../models/response.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm = new FormGroup({
    username : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
})
  constructor(private api:LoginService, private router:Router){}

  ngOnInit():void{

  }

  onRegister(form: any){
    this.api.registerUser(form).subscribe(data=>{
      let dataResponse:ResponseI = data;
      if(dataResponse.status == "OK"){
        localStorage.setItem("user",dataResponse.data);
        this.router.navigate(['home']);
      }
    })
  }
}
