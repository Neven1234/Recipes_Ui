import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/Models/userModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { UserService } from 'src/app/Service/user.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private services:UserService,private Router:Router,private app:AppComponent){}
   
  userLog:User={
    id:0,
    username:'',
    password:'',
    token:'',
    email:''
  }
  LogIn(){
    this.services.Login(this.userLog).subscribe({
      next:(respons)=>{
        console.log('tokoko '+respons)
        
        if(respons=='Username or Passwored are wrong')
        {
          alert('Username or Passwored are wrong');
          
        }
        else{
          this.app.isLogged=true;
          this.services.storeToken(respons);
          alert('Login successfully');
          this.Router.navigate(['']);
        }
       
      },
      error:(res)=>{
        
        console.log(res);
      }
    })
  }

}
