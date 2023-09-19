import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/userModel';
import { UserService } from 'src/app/Service/user.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  constructor(private services:UserService,private Router:Router){}
  userRegist:User={
    id:0,
    username:'',
    password:'',
    email:''

  }
  register(){
    this.services.Register(this.userRegist).subscribe({
      next:(respons)=>{
        alert('Account  Created successfully');
        this.Router.navigate(['LogIn']);
        console.log(respons)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  ///validations
  RegisterForm=new FormGroup({
    UserName:new FormControl('',Validators.required),
    Password:new FormControl('',Validators.required),
    Email:new FormControl('',Validators.email)

  })
  get UserName(){return this.RegisterForm.get('UserName')}
  get Password(){return this.RegisterForm.get('Password')}
  get Email(){return this.RegisterForm.get('Email')}

}
