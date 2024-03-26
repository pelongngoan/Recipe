import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredients';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ShoppingListComponent implements OnInit {
  recipe: Recipe | undefined;
  ingredientForm = this.formBuilder.group({
    name: ['', Validators.required],
    quantity: [0, Validators.required],
  });
  id: string | undefined;
  index: number | undefined;
  editMode = false;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.recipeService.getRecipeById(params['id']).then((recipe) => {
        this.recipe = recipe;
      });
    });
  }

  onEditItem(ingredient: Ingredients) {
    this.editMode = true;
    this.index = this.recipe!.ingredients.indexOf(ingredient);
    this.ingredientForm.setValue(ingredient);
  }
  handleUpdate() {
    if (this.ingredientForm.valid) {
      if (!this.editMode) {
        if (this.recipe && this.recipe.ingredients) {
          this.recipe.ingredients.push(
            this.ingredientForm.value as Ingredients
          );
        }
      } else if (
        this.index !== undefined &&
        this.recipe &&
        this.recipe.ingredients
      ) {
        const updatedIngredient: Ingredients = {
          name: this.ingredientForm.value.name || '',
          quantity: this.ingredientForm.value.quantity || 0,
        };
        this.recipe.ingredients.splice(this.index, 1, updatedIngredient);
      }
      this.recipeService.updateRecipe(this.recipe as Recipe, this.id!);
      this.handleClear();
    }
  }
  handleDelete() {
    const ingredientToDelete = this.ingredientForm.value;
    if (this.recipe && this.recipe.ingredients) {
      const index = this.recipe.ingredients.findIndex(
        (ingredient) =>
          ingredient.name === ingredientToDelete.name &&
          ingredient.quantity === ingredientToDelete.quantity
      );

      if (index !== -1) {
        this.recipe.ingredients.splice(index, 1);
        this.recipeService.updateRecipe(this.recipe as Recipe, this.id!);
      } else {
        console.log("Ingredient not found in the recipe's ingredients list.");
      }
    } else {
      console.log('Recipe or ingredients list is undefined.');
    }
    this.handleClear();
  }
  handleClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
