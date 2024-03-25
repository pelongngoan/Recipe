import { Injectable } from '@angular/core';
import { Ingredients } from './ingredients';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  url = 'http://localhost:3000/recipes';

  //   async updateIngredient(recipeId: string, ingredientId: string, updatedIngredient: Ingredients) {
  //     const recipe = await this.getRecipeById(recipeId);
  //     const ingredientIndex = recipe.ingredients.findIndex((ing: { id: string; }) => ing.id === ingredientId);

  //     if (ingredientIndex !== -1) {
  //       recipe.ingredients[ingredientIndex] = updatedIngredient;
  //       return await fetch(`${this.url}/${recipeId}`, {
  //         method: 'PUT',
  //         body: JSON.stringify(recipe),
  //         headers: { 'Content-Type': 'application/json' },
  //       });
  //     } else {
  //       throw new Error('Ingredient not found');
  //     }
  //   }
  //  async getIngredientByID(recipeId: string, ingredientId: string) {
  //     const recipe = await this.getRecipeById(recipeId);
  //     const ingredient = recipe.ingredients.find((ing: { id: string; }) => ing.id === ingredientId);

  //     if (ingredient) {
  //       return ingredient;
  //     } else {
  //       throw new Error('Ingredient not found');
  //     }
  //   }
}
