import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeCompComponent } from './Components/RecipesComponent/add-recipe-comp/add-recipe-comp.component';
import { RecipesListComponent } from './Components/RecipesComponent/recipes-list/recipes-list.component';
import { ViewRecipeComponent } from './Components/RecipesComponent/view-recipe/view-recipe.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
