import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent {
  constructor(private route:ActivatedRoute ,private recipeService:RecipesService,private editDialog:MatDialog, private Router:Router,private userservice:UserService){}
  recipe:Recipe={
    id:0,
    name:'',
    ingredients:'',
    steps:'',
    image:'',
    userName:''
  }
  temp:string='';
  authorized:boolean=false;
  ngOnInit():void{
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=Number( params.get('id'));
        if(id){
          this.recipeService.getRecipe(id).subscribe({
            next:(res)=>{
              this.recipe=res
              this.temp=this.userservice.GetUserName()
              if(this.temp==this.recipe.userName)
              {
                this.authorized=true;
              }
            }
          })
        }
      }
    })
    
  }
  openDialog(data:Recipe){
    this.editDialog.open(EditDialogComponent,{
      width:'40%',
      height:'529px',
      data,
    })
  }
  //delete
  deletRecipe(id:number)
  {
    if(confirm("Are you Sure")){
      this.recipeService.DeletRecipe(id).subscribe({
        next:(res)=>{
          console.log('deleted')
          alert('Deleted Successfully')
          this.Router.navigate(['']);
        },
        error:(res)=>{
          console.log('error is: '+res);
        }
      })
    }
    
  }
  Notauthorized(){
    alert("You are not authorized to edit this recipe ")
  }
}
