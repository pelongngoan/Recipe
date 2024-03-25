import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredients';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
  imports: [CommonModule, FormsModule],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] | undefined;
  ingredient: Ingredients = {
    name: '',
    quantity: 0,
  };
  id: string | undefined;
  index: number | undefined;
  editMode = false;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.recipeService.getRecipeById(params['id']).then((recipe) => {
        this.ingredients = recipe.ingredients;
      });
    });
  }

  onEditItem(ingredient: Ingredients) {
    this.editMode = true;
    this.ingredient = ingredient;
    this.index = this.ingredients?.indexOf(ingredient);
  }
  handleUpdate() {
    if (
      this.ingredients &&
      this.index !== undefined &&
      this.index >= 0 &&
      this.index < this.ingredients.length
    ) {
      this.ingredients[this.index] = this.ingredient!;
      console.log(this.ingredients);
    } else {
      console.error(
        'Invalid index or ingredients array is not properly initialized.'
      );
    }
  }
  handleDelete() {
    throw new Error('Method not implemented.');
  }
  handleClear() {
    this.ingredient = { name: '', quantity: 0 };
    this.editMode = false;
  }
}
