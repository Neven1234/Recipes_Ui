import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../Models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  basUrl:string=environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  //Log in
  Login(user:User):Observable<string>{
    const options = {responseType: 'text' as 'json'};
    return this.http.post<string>(this.basUrl+'/api/User/LogIn',user,options)
  }

  logintest(user:User):Observable<string>{
    const options = {responseType: 'text' as 'json'};
    return this.http.post<string>(this.basUrl+'/api/User/LogIn',user,options)
  }

  //register
  Register(user:User):Observable<User>{
    const options = {responseType: 'text' as 'json'};
    return this.http.post<User>(this.basUrl+'/api/User/Regist',user,options)
  }

  //tokenSave
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  IsLoggedin():boolean{
    if(localStorage.getItem("token")=="undefined" ||localStorage.getItem("token")==null) 
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  logOut(){
    localStorage.clear();
  }
  StorExpirationDate(date:Date){
    localStorage.setItem("ExpirationDate",date.toString())
  }
  getExpirationDate(){
    return localStorage.getItem("ExpirationDate");
  }

}
