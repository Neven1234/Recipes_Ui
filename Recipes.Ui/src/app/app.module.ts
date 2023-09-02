import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesListComponent } from './Components/RecipesComponent/recipes-list/recipes-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddRecipeCompComponent } from './Components/RecipesComponent/add-recipe-comp/add-recipe-comp.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { ViewRecipeComponent } from './Components/RecipesComponent/view-recipe/view-recipe.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    AddRecipeCompComponent,
    ViewRecipeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    MatChipsModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
