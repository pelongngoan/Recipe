import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent {
  recipeService: RecipeService = inject(RecipeService);
  onCancel() {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    console.log(this.recipeForm.value);
  }

  recipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageURL: ['', [Validators.required, Validators.pattern('https?://.+')]],
    ingredients: this.formBuilder.array([]),
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router // Inject the Router
  ) {}
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  addIngredients() {
    this.ingredients.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
      })
    );
  }
  removeIngredients(index: number) {
    this.ingredients.removeAt(index);
  }

  async handleSaveRecipe(): Promise<void> {
    // Change the return type to void as we don't need to return anything
    const data = await this.recipeService.post(this.recipeForm.value as Recipe);
    if (data) {
      // Check if the submission was successful
      // Navigate back to the home page
      this.router.navigate(['/']); // Assuming '/' is the route for the home page
    } else {
      // Handle error case, maybe display a message to the user
    }
  }
}
