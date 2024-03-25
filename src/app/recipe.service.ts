import { Injectable } from '@angular/core';
import { Ingredients } from './ingredients';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}
  url = 'http://localhost:3000/recipes';
  post(
    value: Partial<{
      name: string | null;
      description: string | null;
      imageURL: string | null;
      ingredients: Ingredients[];
    }>
  ) {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
  }
  get() {
    return fetch(this.url);
  }
  getOne(id: number) {
    console.log(fetch(`${this.url}/${id}`));
    return fetch(`${this.url}/${id}`);
  }
}
