import { Injectable } from '@angular/core';
import { Ingredients } from './ingredients';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  url = 'http://localhost:3000/recipes';
  async addRecipe(value: Recipe) {
    return await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(value),
    });
  }
  async updateRecipe(value: Recipe, id: string) {
    return await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(value),
    });
  }
  async getAllRecipe(): Promise<Recipe[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getRecipeById(id: string): Promise<Recipe> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }
  async getIngredientByIdAndIndex(
    id: string,
    index: number
  ): Promise<Ingredients | undefined> {
    const recipe = await this.getRecipeById(id);
    if (recipe && recipe.ingredients && recipe.ingredients.length > index) {
      return recipe.ingredients[index];
    } else {
      return undefined;
    }
  }
  async deleteRecipe(id: String) {
    return await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }
}
