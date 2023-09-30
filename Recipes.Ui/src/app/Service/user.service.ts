import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../Models/userModel';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { changePassword } from '../Models/ChangePassword';
import { resetPassword } from '../Models/ResetPassword';
import { StringLiteral } from 'typescript';
import { Recipe } from '../Models/ReipeModel';



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
  StoreUserName(username:string){
    localStorage.setItem("UserName",username);
  }
  GetUserName(){
    return localStorage.getItem("UserName")
  }
  //Get user
  GetUser(username:string):Observable<User>
  {
    return this.http.get<User>(this.basUrl+'/api/User/GetUser/'+username)
  }
  //get user id
  GetUserId( username:string):Observable<string>{
    const options = {responseType: 'text' as 'json'};
    return this.http.get<string>(this.basUrl+'/api/User/GetUserId/'+username,options)
  }
  //get user recipes
  GetUserRecipes(username:string):Observable<Recipe[]>{
    const options = {responseType: 'text' as 'json'};
    return this.http.get<Recipe[]>(this.basUrl+'/api/Recipe/userRecipes/'+username)
  }

  StoreUserId(Id:string){
    localStorage.setItem("UserId",Id);
  }
  GetUserIdFormSorage(){
    return localStorage.getItem("UserId");
  }

  //UpdateUSer
  UpdateData(user:User,username:string):Observable<string>{
    const options = {responseType: 'text' as 'json'};
    return this.http.put<string>(this.basUrl+'/api/User/Update/'+username,user,options)
    
  }
  //change password
  ChangePassword(passwordRequest:changePassword,username: string):Observable<string>
  {
    const options = {responseType: 'text' as 'json'};
    return this.http.post<string>(this.basUrl+'/api/User/ChangePassword/'+username,passwordRequest,options)
  }
  //Forget password
  ForgetPassword( username:string ):Observable<string>{
    const options = {responseType: 'text' as 'json'};
    return this.http.post<string>(this.basUrl+'/api/User/ForgetPassword/'+username,options)
  }

  ResetPasswored(resetReq:resetPassword,username:string):Observable<string>
  {
    const options = {responseType: 'text' as 'json'};
    return this.http.post<string>(this.basUrl+'/api/User/reset-password/'+username,resetReq,options)
  }
}
