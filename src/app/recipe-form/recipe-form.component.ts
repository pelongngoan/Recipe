import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent {
  url = 'http://localhost:3000/recipes';
  recipeList: Recipe[] = [];
  onSubmit() {
    console.log(this.recipeForm.value);
    console.log(this.recipeList);
  }

  recipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageURL: ['', [Validators.required]],
    ingredients: this.formBuilder.array([]),
  });
  constructor(private formBuilder: FormBuilder) {
    this.getAllRecipe().then((data: Recipe[]) => {
      this.recipeList = data;
      console.log(this.recipeList);
    });
  }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addIngredients() {
    this.ingredients.push(this.formBuilder.control('', [Validators.required]));
  }
  removeIngredients() {
    this.ingredients.push(this.formBuilder.control('', [Validators.required]));
  }
  async getAllRecipe(): Promise<Recipe[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
