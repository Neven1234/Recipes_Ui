import { Component, isStandalone } from '@angular/core';
import { Router } from '@angular/router';
import { Ingrediant } from 'src/app/Models/ingrediant';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';
@Component({
  selector: 'app-add-recipe-comp',
  templateUrl: './add-recipe-comp.component.html',
  styleUrls: ['./add-recipe-comp.component.css'],
})
export class AddRecipeCompComponent {
  recipe:Recipe={
    id:0,
    name:'',
    ingredients:'',
    steps:'',
    imageName:'',
  }
  NewIngrediant:Ingrediant={
    id:0,
    name:''
  }
  ingrediants:Ingrediant[]=[]
  constructor(private recipeService:RecipesService, private Router:Router){}
  ngOnInit():void{
    this.recipeService.GetAllIngredients().subscribe({
      next:(res)=>{
        this.ingrediants=res
        console.log(this.ingrediants)
      }
    })
  }
  public AddIngrediant(){
    console.log("test")
    this.recipeService.AddIngredient(this.NewIngrediant).subscribe({
      next:(res)=>{
        console.log(res.name)
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }
  public selectedvalue:string=''
  getSelectedValue(value:any){
  
    // Print selected value
    this.selectedvalue+=', '+value;
    this.recipe.ingredients=this.selectedvalue;
    console.log("the fvlue yam"+value);
  }
  
  addRecipe()
  {
    
    this.recipeService.addREcipe(this.recipe)
    .subscribe({
      next:(addedTask)=>{
        console.log('tm')
      },
      error:(response)=>{
        this.Router.navigate(['']);
        console.log('the fkn error '+response);
      }

    })
  }
}
