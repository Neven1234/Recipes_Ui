import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent {
  constructor(private route:ActivatedRoute ,private recipeService:RecipesService){}
  recipe:Recipe={
    id:0,
    name:'',
    ingredients:'',
    steps:'',
    imageName:'',
  }
  ngOnInit():void{
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=Number( params.get('id'));
        if(id){
          this.recipeService.getRecipe(id).subscribe({
            next:(res)=>{
              this.recipe=res
            }
          })
        }
      }
    })
  }

}
