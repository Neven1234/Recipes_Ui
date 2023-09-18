import { Component } from '@angular/core';
import { RecipesService } from './Service/recipes.service';
import { Ingrediant } from './Models/ingrediant';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { UserService } from './Service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private recipyServer:RecipesService ,private ureserver:UserService){}
  title = 'Recipes.Ui';
  isLogged:boolean=false;
  SearchInput:string=''
  SearchIngredient:string=''
  ingrediants:Ingrediant[]=[]
  listOfIngredients:string[]=[]
  ngOnInit(){
    this.recipyServer.GetAllIngredients().subscribe({
      next:(res)=>{
        this.ingrediants=res
        console.log(this.ingrediants)
      }
    })
    this.isLogged=this.ureserver.IsLoggedin();
  }
  //////
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
  singOu(){
    this.ureserver.logOut();
    this.isLogged=false;
  }
}
