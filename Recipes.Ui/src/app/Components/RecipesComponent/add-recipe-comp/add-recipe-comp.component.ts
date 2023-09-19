import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, isStandalone } from '@angular/core';
import { Event, Router } from '@angular/router';
import { Ingrediant } from 'src/app/Models/ingrediant';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';

import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-add-recipe-comp',
  templateUrl: './add-recipe-comp.component.html',
  styleUrls: ['./add-recipe-comp.component.css'],
})
export class AddRecipeCompComponent {
  removable:true
 selectable:true
 addOnBlur:true
 //imgUrl:string=environment.baseImageUrl;
  recipe:Recipe={
    id:0,
    name:'',
    ingredients:'',
    steps:'',
    image:'',
  }
  NewIngrediant:Ingrediant={
    id:0,
    name:''
  }
  ingrediants:Ingrediant[]=[]
  listOfSelectedIngrediants:string[]=[]
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listOfSelectedIngrediants, event.previousIndex, event.currentIndex);
  }
  remove(ingrediant: string): void {
    const index = this.listOfSelectedIngrediants.indexOf(ingrediant);
  
    if (index >= 0) {
      this.listOfSelectedIngrediants.splice(index, 1);
    }
  }
  selecte:boolean=false; 
  imageUrl:string='/assets/img/default.jpg'
  fileToUpload:any;
  selectedFile:File;
  constructor(private recipeService:RecipesService, private Router:Router){}
  ngOnInit():void{
    this.recipeService.GetAllIngredients().subscribe({
      next:(res)=>{
        this.ingrediants=res
        console.log(this.ingrediants)
      }
    })
  }
  public AddIngrediant(){
    console.log("test")
    this.recipeService.AddIngredient(this.NewIngrediant).subscribe({
      next:(res)=>{
        console.log(res.name)
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }
  public selectedvalue:string=''
  getSelectedValue(value:any){
  
    // Print selected value
    //this.selectedvalue+=', '+value;
   // this.recipe.ingredients=this.selectedvalue;
   this.listOfSelectedIngrediants.push(value)
    console.log("the fvlue yam"+value);
  }
  
  addRecipe()
  {

    if(this.fileToUpload!=null){
      this.recipe.image=environment.baseImageUrl+this.fileToUpload.name;
    }
    else{
      this.recipe.image=null
    }
    
    console.log("haa: "+this.recipe.image)
    this.recipe.ingredients=this.listOfSelectedIngrediants.toString()
    this.recipeService.addREcipe(this.recipe)
    .subscribe({
      next:(_addedTask)=>{
        console.log('tm')
        alert('Recipe Added successfully');
        this.Router.navigate(['']);
      },
      error:(response)=>{
        
        console.log(response);
      }

    })

  }
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
 ///validations
 addNew=new FormGroup({
  Name:new FormControl('',Validators.minLength(3)),
  newIngrediant:new FormControl('',Validators.minLength(3)),
  Steps:new FormControl('',Validators.minLength(1)),
  Ingrediant:new FormControl('',Validators.minLength(1))
 })
 get Name(){return this.addNew.get('Name')}
 get Steps(){return this.addNew.get('Steps')}
 get Ingrediant(){return this.addNew.get('Ingrediant')}
}

