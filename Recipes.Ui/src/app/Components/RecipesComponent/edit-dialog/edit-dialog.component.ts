import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Recipe } from 'src/app/Models/ReipeModel';
import { Ingrediant } from 'src/app/Models/ingrediant';
import { RecipesService } from 'src/app/Service/recipes.service';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { FormControl,FormGroup,Validators } from '@angular/forms';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{
  
 constructor(@Inject(MAT_DIALOG_DATA)private data:Recipe,private recipeService:RecipesService){}
 recipe:Recipe={
  id:0,
  name:'',
  ingredients:'',
  steps:'',
  image:'',
  userName:''
}
 ingrediants:Ingrediant[]=[]
 listOfIngredients:string[]=this.data.ingredients.split(',')
 public selectedvalue:string=''
 removable:true
 selectable:true
 addOnBlur:true
//image
  imageUrl:string='assets/img/default.jpg'
  fileToUpload:any;
  selectedImage:boolean=false;
 getSelectedValue(value:any){
 
   // Print selected value
   if(value){
    this.listOfIngredients.push(value)
   }
   
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
  ngOnInit(): void {
    this.recipe=this.data
    if(this.recipe.image!=null)
    {
      this.imageUrl=this.recipe.image
    }
    this.recipeService.GetAllIngredients().subscribe({
      next:(res)=>{
        this.ingrediants=res
        console.log(this.ingrediants)
      }
    })
  }

  editRecipe(){
    this.recipe.ingredients=this.listOfIngredients.toString() 
    if(this.selectedImage)
    {
      this.recipe.image="https://localhost:7206/Resourcess/images/"+this.fileToUpload.name;
    }
    this.recipeService.EditRecipe(this.data.id,this.recipe).subscribe({
      next:(res)=>{
        console.log('path el sora ba3d el submit :'+this.recipe.image)
        alert('Edited succssesfuly')
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }
  //image
   //upload image
   handelDileInput(file:FileList){
    this.fileToUpload=file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log('esm el soraaa: '+this.fileToUpload.name)
  }
 onSubmit(Image){
  this.recipeService.postFile(this.fileToUpload).subscribe({
    next:(res)=>{
      console.log('done');
    }
  })
 }
 removeImage(){
  this.recipe.image=null
  this.imageUrl='assets/img/default.jpg'
 }
 ///validations
 Edite=new FormGroup({
  Name:new FormControl('',Validators.minLength(3)),
  newIngrediant:new FormControl('',Validators.minLength(3)),
  Steps:new FormControl('',Validators.minLength(1)),
  Ingrediant:new FormControl('',Validators.minLength(1))
})
get Name(){return this.Edite.get('Name')}
get Steps(){return this.Edite.get('Steps')}
get Ingrediant(){return this.Edite.get('Ingrediant')}
}
