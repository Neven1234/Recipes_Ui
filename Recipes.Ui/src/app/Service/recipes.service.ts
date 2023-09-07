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
  return this.http.post<Ingrediant>(this.basUrl+'/api/Ingredients',addedIngredient);
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
    return this.http.post<Recipe>(this.basUrl +'/api/Recipe',addRequest);
  }
  getRecipe(id:number):Observable<Recipe>{
    return this.http.get<Recipe>(this.basUrl+'/api/Recipe/'+id)
  }


}
