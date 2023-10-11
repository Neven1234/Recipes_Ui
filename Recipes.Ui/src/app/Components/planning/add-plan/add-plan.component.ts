import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Planner } from 'src/app/Models/Planner';
import { ShoppingList } from 'src/app/Models/Sopping';
import { RecipesService } from 'src/app/Service/recipes.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {
  constructor(private recipeService:RecipesService,private userService:UserService,@Inject(MAT_DIALOG_DATA)private data:string ,private Router:Router){}
  RecipeNames:string[]=[]
  selectedRecipe:string;
  temp:string
  planForDay:Planner={
    id:0,
    userId:'',
    recipeId:0,
    date:new Date()
    
  }
  shoppingList:ShoppingList={
    id:0,userId:'',ingredient:'',purchased:false
  }
  ingredients:string[]=[]
  userId:string=this.userService.GetUserIdFormSorage();
  ngOnInit(){
    this.recipeService.getAllRecipes().subscribe({
      next:(response)=>{
        response.forEach(element => {
          this.RecipeNames.push(element.name)
        });
      }
    })
    this.planForDay.userId=this.userService.GetUserIdFormSorage();
    this.temp=this.data
    //this.temp += ' 01:00'
    this.planForDay.date=new Date(this.temp)
  }
  getSelectedCategory(value:any){
    this.selectedRecipe=value
    console.log("the fvlue yam"+value);
    this.recipeService.GetSearch(value).subscribe({
      next:(response)=>{
        this.planForDay.recipeId=response[0].id

         this.ingredients=response[0].ingredients.split(',')
        
      }
    })
    console.log('el plan:' +this.planForDay.date+' userId '+ this.planForDay.userId)
  }
  submit(){
    this.userService.AddPlan(this.planForDay,this.planForDay.userId).subscribe({
      next:(response)=>{       
            this.ingredients.forEach(element => {
              this.shoppingList.ingredient=element
              this.shoppingList.userId=this.userId
              this.shoppingList.purchased=false
              this.userService.AddToShoppingList(this.shoppingList,this.userId).subscribe({
                next:(res)=>{
                  console.log(res + ' '+this.shoppingList.ingredient)
                  this.shoppingList.ingredient=''
                  this.shoppingList.userId=''
                  this.shoppingList.purchased=false
                }
              })              
           });
            alert(response)
            this.Router.navigate(['Profile'])
        
      }
    })
  }
}
