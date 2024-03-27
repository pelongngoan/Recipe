import { Injectable } from '@angular/core';
import { Ingredients } from './ingredients';
import { ShoppingItem } from './shopping-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  url = 'http://localhost:3000/shopping-list';
  async addShoppingItem(value: ShoppingItem) {
    return await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(value),
    });
  }
  async updateShoppingItem(value: ShoppingItem, id: string) {
    return await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(value),
    });
  }
  async getAllShoppingItem(): Promise<ShoppingItem[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getShoppingItemById(id: string): Promise<ShoppingItem> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }
  async deleteShoppingItem(id: String) {
    return await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }
}
