import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Recipe } from '../recipe';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
  ],
})
export class RecipesComponent {
  selectedRecipe: Recipe | undefined;
  headerShow: boolean = true;
}
