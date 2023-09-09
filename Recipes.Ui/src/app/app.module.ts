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
import {MatChipsModule ,} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import { ViewRecipeComponent } from './Components/RecipesComponent/view-recipe/view-recipe.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import{ MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EditDialogComponent } from './Components/RecipesComponent/edit-dialog/edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    AddRecipeCompComponent,
    ViewRecipeComponent,
    EditDialogComponent,
    
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
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
