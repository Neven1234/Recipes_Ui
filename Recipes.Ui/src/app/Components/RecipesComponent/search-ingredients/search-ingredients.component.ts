import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';

@Component({
  selector: 'app-search-ingredients',
  templateUrl: './search-ingredients.component.html',
  styleUrls: ['./search-ingredients.component.css']
})
export class SearchIngredientsComponent {
  Recipes :Recipe[]=[
  ];
  constructor(private recipyServer:RecipesService,private route:ActivatedRoute){}
  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(params)=>{
        const ingredient=String( params.get('ingredient'));
        if(ingredient){
          this.recipyServer.GetRecipeBuyIngredients(ingredient).subscribe({
            next:(res)=>{
              this.Recipes=res
              console.log(this.Recipes.length)
            },
            error:(res)=>{
              console.log(res)
            }
          })
        }
      }
    })
  }
}
