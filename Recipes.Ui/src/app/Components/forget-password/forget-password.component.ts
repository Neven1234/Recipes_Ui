import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { resetPassword } from 'src/app/Models/ResetPassword';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
constructor(private userservice:UserService,private Router:Router){}
restPass:resetPassword={
  passwored:'',
  confirmPasswored:'',
  email:'',
  token:''
}
username:string;
ngOnInit(){}
resetPassworedd(){
  this.restPass.email="hgjdfg"
  this.userservice.ResetPasswored(this.restPass,this.username).subscribe({
    next:(response)=>{
      console.log(response)
      if(response=='the password don match the confirm password')
      {
        alert(response)
      }
      else{
        alert(response)
        this.Router.navigate(['Profile']);
      }
     
    }
  })
}
}
