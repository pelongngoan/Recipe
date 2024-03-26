import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: 'edit/:id', component: RecipeFormComponent },
      { path: 'edit', component: RecipeFormComponent },
      { path: 'detail/:id', component: RecipeDetailComponent },
    ],
  },
  {
    path: 'shopping-list/:id',
    component: ShoppingListComponent,
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
