import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/Models/userModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { UserService } from 'src/app/Service/user.service';
import { AppComponent } from 'src/app/app.component';
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private services:UserService,private Router:Router,private app:AppComponent){}
   
  userLog:User={
    id:0,
    userName:'',
    password:'',
    email:'null'
  }
  Expiration:Date;
 userId(){
  this.services.GetUserId(this.userLog.userName).subscribe({
    next:(res)=>{
      console.log('el Id '+res)
      this.services.StoreUserId(res);
    }
  })
 }
  LogIn(){
    this.services.logintest(this.userLog).subscribe({
      next:(respons)=>{
        this.services.StoreUserName(this.userLog.userName);
        console.log('tokoko '+respons)
        var listt=respons.split(/[,:}]/);
        console.log(listt);
       
        if(respons=='Username or Passwored are wrong'|| respons=='Please conferm your email by click the linke we sent it to you')
        {
          alert(respons);
          
        }
        else{
          this.app.isLogged=true;
          var  temp = listt[3].substring(1, listt[3].length-1);
          temp += ' 01:00';
          this.services.StorExpirationDate(new Date(temp));
          this.Expiration=new Date(temp);
          console.log("exp: "+this.Expiration);
          this.services.storeToken(listt[1]);
          alert('Login successfully');
          this.Router.navigate(['']);
        }
       
      },
      error:(res)=>{
        
        console.log(res);
      }
    })
  }

  ForgetPasswored(){
    this.Router.navigate(['FogetPassword'])
    this.services.ForgetPassword(this.userLog.userName).subscribe({
      next:(respose)=>{
        alert(respose)
        console.log(respose)
      },
      error:(error)=>{
        alert("email has been sent to you")
        console.log(error);
      }
    })
   }

  ///validations
  LogInForm=new FormGroup({
    UserName:new FormControl('',Validators.required),
    Password:new FormControl('',Validators.required)
  })
  get UserName(){return this.LogInForm.get('UserName')}
  get Password(){return this.LogInForm.get('Password')}

}
