import { Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';

export const routes: Routes = [
  {
    path: 'recipe-book',
    component: RecipeBookComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [{ path: 'form', component: RecipeFormComponent }],
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
];
