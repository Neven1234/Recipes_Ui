import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { changePassword } from 'src/app/Models/ChangePassword';
import { User } from 'src/app/Models/userModel';
import { UserService } from 'src/app/Service/user.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { resetPassword } from 'src/app/Models/ResetPassword';
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {
  constructor(private userService:UserService,private Router:Router){}
  usernam:string
  userId:string=this.userService.GetUserIdFormSorage()
  user:User={
    id:0,
    userName:'',
    email:'',
    password:'fhghfgfgd'

  }
  message:string='';
  SomethingWentWrong:boolean=false
  successeded:boolean=false
  ChangePass:changePassword={
    oldPasswored:'',
    newPasswored:'',
    confirmPasswored:''
  }
  
  ngOnInit(){
    this.usernam= this.userService.GetUserName()
    this.userService.GetUser(this.userId).subscribe({
      next:(respons)=>{
        this.user=respons
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
 clicked:boolean=false
 changePassswordClicked(){
  this.clicked=true;
 }
 UpdateUserNameOrEmail(){
  this.user.password='fhgjfhg'

  this.userService.UpdateData(this.user,this.usernam).subscribe({
    next:(response)=>{
      //alert(response)
      this.successeded=true
      this.message=response
      this.userService.StoreUserName(this.user.userName)
      setTimeout( () => {this.Router.navigate(['Profile']); }, 2500 );
    },
    error:(error)=>{
      console.log(error)
    }
  })
 }
 changePassword(){
  this.userService.ChangePassword(this.ChangePass,this.usernam).subscribe({
    next:(response)=>{
      
      //alert(response)
      if(response=='Password changeed successfully')
      {
        this.successeded=true
        this.message=response
        setTimeout( () => {this.Router.navigate(['Profile']); }, 2500 );
      }
     else{
      alert(response)
     }
     
    },
    error:(error)=>{
      console.log(error)
    }
  })
 }
 ForgetPasswored(){
  //this.Router.navigate(['FogetPassword'])
  alert("email has been sent to you")
  this.userService.ForgetPassword(this.usernam).subscribe({
    next:(respose)=>{
      alert("email has been sent to you")
      console.log(respose)
    },
    error:(error)=>{
      alert("email has been sent to you")
      console.log(error);
    }
  })
 }
  ///validations
  settings=new FormGroup({
    UserName:new FormControl('',Validators.required),
    Email:new FormControl('',Validators.email)

  })
  get UserName(){return this.settings.get('UserName')}
  get Email(){return this.settings.get('Email')}

  changePassworedd=new FormGroup({
    oldpassword:new FormControl('',Validators.required),
    newpassword:new FormControl('',Validators.required),
    confirmpassword:new FormControl('',Validators.required)

  })
  get oldpassword(){return this.settings.get('oldpassword')}
  get newpassword(){return this.settings.get('newpassword')}
  get confirmpassword(){return this.settings.get('Emaconfirmpasswordil')}

}
