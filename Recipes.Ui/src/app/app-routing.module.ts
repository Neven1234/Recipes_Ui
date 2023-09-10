import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeCompComponent } from './Components/RecipesComponent/add-recipe-comp/add-recipe-comp.component';
import { RecipesListComponent } from './Components/RecipesComponent/recipes-list/recipes-list.component';
import { ViewRecipeComponent } from './Components/RecipesComponent/view-recipe/view-recipe.component';
import { SearchResultComponent } from './Components/RecipesComponent/search-result/search-result.component';
import { SearchIngredientsComponent } from './Components/RecipesComponent/search-ingredients/search-ingredients.component';

const routes: Routes = [
  {
    path:'',
    component:RecipesListComponent
  },
  {
    path:'Add',
    component:AddRecipeCompComponent
  },
  {
    path:'View/:id',
    component:ViewRecipeComponent
  },
  {
    path:'Search/Result/:term',
    component:SearchResultComponent
  },
  {
    path:'SearchIngredie/Result/:ingredient',
    component:SearchIngredientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
