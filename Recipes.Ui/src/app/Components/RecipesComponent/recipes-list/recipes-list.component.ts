import { Component } from '@angular/core';
import{ Recipe } from 'src/app/Models/ReipeModel'
import { RecipesService } from 'src/app/Service/recipes.service';
import { forEachChild } from 'typescript';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  Recipes :Recipe[]=[
  ];
  constructor(private recipyServer:RecipesService){}

  ngOnInit(){
    this.recipyServer.getAllRecipes().subscribe({
      next:(recipes)=>{
        this.Recipes=recipes;
      },
      error:(respons)=>{
        console.log(respons)
      }
    })
  }

}
