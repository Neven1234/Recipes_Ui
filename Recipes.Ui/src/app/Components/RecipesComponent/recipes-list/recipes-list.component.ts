import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ Recipe } from 'src/app/Models/ReipeModel'
import { Ingrediant } from 'src/app/Models/ingrediant';
import { RecipesService } from 'src/app/Service/recipes.service';
import { forEachChild } from 'typescript';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { UserService } from 'src/app/Service/user.service';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
  Recipes :Recipe[]=[
  ];
  ingrediants:Ingrediant[]=[]
  listOfIngredients:string[]=[]
  SearchInput:string=''
  SearchIngredient:string=''
  constructor(private recipyServer:RecipesService ,private usrser:UserService){}

  ngOnInit(){
    this.recipyServer.getAllRecipes().subscribe({
      next:(recipes)=>{
        this.Recipes=recipes;
      },
      error:(respons)=>{
        console.log(respons)
      }
    })
    this.recipyServer.GetAllIngredients().subscribe({
      next:(res)=>{
        this.ingrediants=res
        console.log(this.ingrediants)
      }
    })
    
    console.log('token is'+localStorage.getItem("token"));
    console.log('token is'+this.usrser.IsLoggedin());
  }

  getSelectedValue(value:any){
 
    // Print selected value
    if(value){
      if(this.listOfIngredients.length==0)
      {
        this.listOfIngredients.push(value)
      }
      else{
        this.listOfIngredients.push(value)
      }
     
    }
  }
  convertTostring(){
    this.SearchIngredient=this.listOfIngredients.toString()
    console.log(this.SearchIngredient)
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfIngredients, event.previousIndex, event.currentIndex);
  }
  
   remove(ingrediant: string): void {
    const index = this.listOfIngredients.indexOf(ingrediant);
  
    if (index >= 0) {
      this.listOfIngredients.splice(index, 1);
    }
  }

}
