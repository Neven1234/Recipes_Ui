import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { UserService } from 'src/app/Service/user.service';
import { RateReview } from 'src/app/Models/RateAndReview';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Favorite } from 'src/app/Models/Favorites';

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
    userName:'',
    category:''
  }
  @Input() maxRating=5;
  @Input() selectStar=0;
  priviaseSelection:number=0;
  maxRatingArray:any[]=[]
  reviews:RateReview[]=[]
  Favo:Favorite[]=[]
  recipeFavId:number
  username:string=this.userservice.GetUserName();
  favorite:Favorite={
    id:0,
    userId:'',
    recipeId:0
  }
  AddedToFavorite:boolean=false;
  seeReviewClicked:boolean=false;
  rate:RateReview={
    id:0,
    rate:0,
    review:'',
    recipeId:0,
    userId:''
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
              this.temp=this.userservice.GetUserIdFormSorage()
              this.rate.userId=this.temp;
              if(this.temp==this.recipe.userName)
              {
                this.authorized=true;
              }
            }
          })
        }
      }

      
    })
    this.maxRatingArray=Array(this.maxRating).fill(0);
    this.userservice.GetFavoriteRecipsId(this.username).subscribe({
      next:(response)=>{
        this.Favo=response
        this.Favo.forEach(Element=>{
          if(Element.recipeId==this.recipe.id)
          {
            this.AddedToFavorite=true
            this.recipeFavId=Element.id
          }
        })
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
  //Rate
  handelEnter(index :number){
    this.selectStar=index+1;
  }
  handelLeave()
  {
    if(this.priviaseSelection!=0)
    {
      this.selectStar=this.priviaseSelection;
    }
    else{
      this.selectStar=0;
    }
  }
  Rating(index:number)
  {
    this.selectStar=index+1;
    this.priviaseSelection=this.selectStar;
    console.log(this.selectStar);
    this.rate.rate=this.selectStar;
  
  }
  send(){
    
    this.recipeService.AddRateAndReview(this.rate,this.recipe.id).subscribe({
      next:(res)=>{
        console.log(res)
        alert('Review submitted  successfully');
      },
      error:(err)=>{
        console.log('error is: '+err)
      }
    })
    this.selectStar=0
    this.refrash()
  }
  getReviews(){
    this.seeReviewClicked=true;
    this.recipeService.GetReviews(this.recipe.id).subscribe({
      next:(res)=>{
        this.reviews=res;
        console.log(res)
      },
      error:(errorr)=>{
        console.log(errorr);
      }
    })
  }
  AddToFavorite(){
    if(this.AddedToFavorite==false)
    {
      this.AddedToFavorite=true
      this.favorite.recipeId=this.recipe.id
      
      this.userservice.AddFavoriet(this.favorite,this.username).subscribe({
        next:(response)=>{
          console.log("el respons el fady"+response)
            this.favorite=response
            this.recipeFavId=response.id
            alert("Added to favorite")
        },
        error:(response)=>{
          console.log(response)
        }
      })
    }
   
  }
  RemoveFromFavorite()
  {
    this.AddedToFavorite=false;
    this.userservice.RemoveFromFavorite( this.recipeFavId).subscribe({
      next:(res)=>{
        alert("removed from favorite");
      }
    })
  }
  refrash(){
    window.location.reload()
  }
  ///validations
  Review=new FormGroup({
    review:new FormControl('',Validators.required)

  })
  get review(){return this.Review.get('review')}

}
