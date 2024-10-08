import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss',
})
export class RecipeFormComponent implements OnInit {
  id: string | undefined;
  editMode = false;
  recipeForm: FormGroup | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageURL: ['', [Validators.required, this.imageUrlValidator]],
      ingredients: this.formBuilder.array([]),
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    if (this.editMode) {
      this.recipeService.getRecipeById(this.id ?? '').then((recipe) => {
        this.recipeForm?.setValue({
          name: recipe.name,
          description: recipe.description,
          imageURL: recipe.imageURL,
          ingredients: [],
        });
        for (let ingredient of recipe.ingredients) {
          this.ingredients.push(
            this.formBuilder.group({
              name: [ingredient.name, Validators.required],
              quantity: [
                ingredient.quantity,
                [Validators.required, this.quantityValidator],
              ],
            })
          );
        }
      });
    }
  }
  imageUrlValidator(control: AbstractControl): { [key: string]: any } | null {
    const validUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const value = control.value as string;
    const isValidUrl = validUrlRegex.test(value);

    return isValidUrl ? null : { invalidUrl: { value: control.value } };
  }
  getImageURLValidity(): any {
    const control = this.recipeForm?.get('imageURL');
    if (control !== null && !control?.touched) {
      return null;
    }
    if (control?.errors?.['required']) {
      return 'URL is required';
    }
    if (control?.errors?.['invalidUrl']) {
      return 'URL is invalid';
    }
    return null;
  }
  get ingredients() {
    return this.recipeForm?.get('ingredients') as FormArray;
  }
  addIngredients() {
    this.ingredients.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        quantity: ['', [Validators.required, this.quantityValidator]],
      })
    );
  }
  removeIngredients(index: number) {
    this.ingredients.removeAt(index);
  }
  quantityValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value <= 0) {
      return { invalidQuantity: { value: 'Quantity must be greater than 0' } };
    }
    return null;
  }
  getQuantityValidity(i: number): any {
    const control = this.recipeForm?.get(`ingredients.${i}.quantity`);
    if (control !== null && !control?.touched) {
      return null;
    }
    if (control?.errors?.['required']) {
      return `Quantity ${i + 1} is required`;
    }
    if (control?.errors?.['invalidQuantity']) {
      return `Quantity ${i + 1} must be greater than 0`;
    }
    return null;
  }

  handleSaveRecipe() {
    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.recipeForm?.value as Recipe,
        this.id ?? ''
      );
    } else {
      this.recipeService.addRecipe(this.recipeForm?.value as Recipe);
    }
    this.router.navigate(['/recipes']);
  }
  handleCancelEdit() {
    this.router.navigate(['/recipes']);
    this.editMode = true;
  }
}
