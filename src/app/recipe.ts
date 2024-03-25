import { Ingredients } from './ingredients';

export interface Recipe {
  id: string;
  name: string;
  imageURL: string;
  description: string;
  ingredients: Ingredients[];
}
