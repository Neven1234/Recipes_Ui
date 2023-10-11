import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { User } from 'src/app/Models/userModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  userName:string
  user:User={
    id:0,
    userName:'',
    email:'',
    password:''
  }
  Recipes :Recipe[]=[];
  constructor( private userService:UserService,private recipeService:RecipesService,private route:ActivatedRoute ){}
  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(params)=>{
        const userId=String( params.get('userId'));
        if(userId){
          this.userService.GetUser(userId).subscribe({
            next:(res)=>{
              this.user=res
              this.userService.GetUserRecipes(this.user.userName).subscribe({
                next:(res)=>{
                  console.log(res)
                  this.Recipes=res;
                }
              })
            }
          })
          
        }
      }
    })
  }
}
