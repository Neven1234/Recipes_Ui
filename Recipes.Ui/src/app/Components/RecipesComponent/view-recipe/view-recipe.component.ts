import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent {
  constructor(private route:ActivatedRoute ,private recipeService:RecipesService,private editDialog:MatDialog, private Router:Router){}
  recipe:Recipe={
    id:0,
    name:'',
    ingredients:'',
    steps:'',
    image:'',
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
  openDialog(data:Recipe){
    this.editDialog.open(EditDialogComponent,{
      width:'65%',
      height:'500px',
      data,
    })
  }
  //delete
  deletRecipe(id:number)
  {
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
