import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingrediant } from '../Models/ingrediant';
import { Recipe } from '../Models/ReipeModel';
import { RateReview } from '../Models/RateAndReview';
import { Category } from '../Models/Categories';

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
 //Category
 GetAllCategories():Observable<Category[]>{
  return this.http.get<Category[]>(this.basUrl+'/api/Ingredients/Category')
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
  addREcipe(addRequest:Recipe,username:string):Observable<Recipe>{
    addRequest.id=0;
    const options = {responseType: 'text' as 'json'};
    return this.http.post<Recipe>(this.basUrl +'/api/Recipe/Add/'+username,addRequest,options);
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
 //search buy name
 GetSearch(term:string):Observable<Recipe[]>
 {
  return this.http.get<Recipe[]>(this.basUrl+'/api/Recipe/search/'+term)
 }

 //search buy ingredient
 GetRecipeBuyIngredients(ingredient:string):Observable<Recipe[]>{
  return this.http.get<Recipe[]>(this.basUrl+'/api/Recipe/searchIng/'+ingredient)
 }

 //Rate and Review

 AddRateAndReview(rateAndReview:RateReview,recipeId:number):Observable<RateReview>{
  rateAndReview.id=0;
  const options = {responseType: 'text' as 'json'};
  return this.http.post<RateReview>(this.basUrl+'/api/Rating/Rating/'+recipeId ,rateAndReview,options)
 }
 GetReviews(recipeID:number):Observable<RateReview[]>
 {
  return this.http.get<RateReview[]>(this.basUrl+'/api/Rating/'+recipeID)
 }
}
