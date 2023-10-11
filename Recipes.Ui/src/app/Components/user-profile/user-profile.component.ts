import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/Models/Favorites';
import { Recipe } from 'src/app/Models/ReipeModel';
import { ShoppingList } from 'src/app/Models/Sopping';
import { RecipesService } from 'src/app/Service/recipes.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private userService:UserService,private recipeService:RecipesService,private Router:Router){}
  userName:string
  Recipes :Recipe[]=[];
  Recipes2:Recipe[]=[];
  favorites:Favorite[]=[];
  shoppingList:ShoppingList[]=[];
  oneItem:ShoppingList={
    id:0,
    userId:'',
    ingredient:'',
    purchased:false
  }
  userId:string=this.userService.GetUserIdFormSorage()
  i:Favorite={
    id:0,
    userId:'',
    recipeId:0
  }
  ngOnInit(){
    this.userName= this.userService.GetUserName()
    this.userService.GetUserRecipes(this.userName).subscribe({
      next:(res)=>{
        console.log(res)
        this.Recipes=res;
      }
    })
    this.userService.GetshoppingLsit(this.userId).subscribe({
      next:(response)=>{
        this.shoppingList=response
      }
    })
    this.Favorites()
  }
  Favorites(){
    this.userService.GetFavoriteRecipsId(this.userName).subscribe({
      next:(value)=>{
        console.log(Array(value))
        this.favorites=value
        this.getFavRecipes((value))
      },
      error:(response)=>{
        console.log(response)
      }
    })
  }
  getFavRecipes(favoritess:Favorite[])
  {
    favoritess.forEach(Element=>{
      this.recipeService.getRecipe(Element.recipeId).subscribe({
        next:(response)=>{
          this.Recipes2.push(response) 
        }
      })
    })
  }
  RemoveFromFavorite(recipeId:number)
  {
    if(confirm("Are you Sure"))
    {
      this.favorites.forEach(Element=>
        {if(Element.recipeId==recipeId)
        {
          this.userService.RemoveFromFavorite(Element.id).subscribe({
            next:(res)=>{
              alert("removed from favorite");
              this.refrash()
            }
          })
        }
      })
    }
   
  }
  refrash(){
    window.location.reload()
  }
  planForTheWeek(){
    this.Router.navigate(['Plan'])
  }
  clear(){
    if(confirm("Are you Sure")){
      this.userService.ClearShoppingList(this.userId).subscribe({
        next:(res)=>{
          alert(res)
          this.refrash()
        }
      })
    }
  }
  Update(id:number){
   this.userService.GetOneItemFromSoppingList(id).subscribe({
    next:(res)=>{
      this.oneItem=res;
      if(this.oneItem.purchased==false)
      {
        this.oneItem.purchased=true
      }
      else{
        this.oneItem.purchased=false
      }
      this.userService.MarkedAsPurchased(this.oneItem,id).subscribe({
        next:(response)=>{
        }
      })
    }
   })
  }
}
