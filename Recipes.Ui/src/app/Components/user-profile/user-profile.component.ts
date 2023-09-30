import { Component } from '@angular/core';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  constructor(private userService:UserService,private recipeService:RecipesService){}
  userName:string
  Recipes :Recipe[]=[];
  ngOnInit(){
    this.userName= this.userService.GetUserName()
    this.userService.GetUserRecipes(this.userName).subscribe({
      next:(res)=>{
        this.Recipes=res;
      }
    })
  }
}
