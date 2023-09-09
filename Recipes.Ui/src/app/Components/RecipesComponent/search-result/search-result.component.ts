import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/Models/ReipeModel';
import { RecipesService } from 'src/app/Service/recipes.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  Recipes :Recipe[]=[
  ];
  constructor(private recipyServer:RecipesService,private route:ActivatedRoute){}
  ngOnInit(){
    this.route.paramMap.subscribe({
      next:(params)=>{
        const term=String( params.get('term'));
        if(term){
          this.recipyServer.GetSearch(term).subscribe({
            next:(res)=>{
              this.Recipes=res
              console.log(this.Recipes)
            },
            error:(res)=>{
              console.log(res)
            }
          })
        }
      }
    })
  }
}
