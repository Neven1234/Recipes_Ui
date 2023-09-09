import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingrediant } from '../Models/ingrediant';
import { Recipe } from '../Models/ReipeModel';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  basUrl:string=environment.baseApiUrl;
  constructor(private http:HttpClient) { }
  //ingredients
  GetAllIngredients():Observable<Ingrediant[]>{
    return this.http.get<Ingrediant[]>(this.basUrl+'/api/Ingredients')
  }
 AddIngredient(addedIngredient:Ingrediant):Observable<Ingrediant>{
  addedIngredient.id=0;
  const options = {responseType: 'text' as 'json'};
  return this.http.post<Ingrediant>(this.basUrl+'/api/Ingredients',addedIngredient,options);
 }
 
 //image
 postFile(fileToUpload:File){
  const endpoint=this.basUrl+'/api/Recipe/ImageUpload';
  const formData:FormData=new FormData();
  formData.append('Image',fileToUpload,fileToUpload.name);
  return this.http.post(endpoint,formData);
 }


  //Recipes
  getAllRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.basUrl+'/api/Recipe')
  }
  addREcipe(addRequest:Recipe):Observable<Recipe>{
    addRequest.id=0;
    const options = {responseType: 'text' as 'json'};
    return this.http.post<Recipe>(this.basUrl +'/api/Recipe',addRequest,options);
  }
  getRecipe(id:number):Observable<Recipe>{
    return this.http.get<Recipe>(this.basUrl+'/api/Recipe/'+id)
  }
 
  EditRecipe(id:number,edditedReicpe:Recipe):Observable<Recipe>{
    const options = {responseType: 'text' as 'json'};
    return this.http.put<Recipe>(this.basUrl+'/api/Recipe/'+id,edditedReicpe,options)
  }
 DeletRecipe(id:number):Observable<Recipe>{
  const options = {responseType: 'text' as 'json'};
  return this.http.delete<Recipe>(this.basUrl+'/api/Recipe/'+id,options)
 }
 //search
 GetSearch(term:string):Observable<Recipe[]>
 {
  return this.http.get<Recipe[]>(this.basUrl+'/api/Recipe/search/'+term)
 }
}