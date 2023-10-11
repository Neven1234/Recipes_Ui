import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeCompComponent } from './Components/RecipesComponent/add-recipe-comp/add-recipe-comp.component';
import { RecipesListComponent } from './Components/RecipesComponent/recipes-list/recipes-list.component';
import { ViewRecipeComponent } from './Components/RecipesComponent/view-recipe/view-recipe.component';
import { SearchResultComponent } from './Components/RecipesComponent/search-result/search-result.component';
import { SearchIngredientsComponent } from './Components/RecipesComponent/search-ingredients/search-ingredients.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterFormComponent } from './Components/register-form/register-form.component';
import { authGuard } from './gurds/auth.guard';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { UserSettingsComponent } from './Components/user-settings/user-settings.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { PlanningComponent } from './Components/planning/planning.component';
import { UsersComponent } from './Components/users/users.component';

const routes: Routes = [
  {
    path:'',
    component:RecipesListComponent
  },
  {
    path:'Add',
    component:AddRecipeCompComponent,canActivate:[authGuard]
  },
  {
    path:'View/:id',
    component:ViewRecipeComponent,canActivate:[authGuard]
  },
  {
    path:'Search/Result/:term',
    component:SearchResultComponent
  },
  {
    path:'SearchIngredie/Result/:ingredient',
    component:SearchIngredientsComponent
  },
  {
    path:'LogIn',
    component:LogInComponent
  },
  {
    path:'LogIn/Register',
    component:RegisterFormComponent
  },
  {
    path:'Profile',
    component:UserProfileComponent,canActivate:[authGuard]
  },
  {
    path:'Profile/Settings',
    component:UserSettingsComponent,canActivate:[authGuard]
  },
  {
    path:'FogetPassword',
    component:ForgetPasswordComponent
  },
  {
    path:'Plan',
    component:PlanningComponent
  },
  {
    path:'User/:userId',
    component:UsersComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
