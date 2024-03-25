import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
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

  recipeForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageURL: ['', [Validators.required]],
    ingredients: this.formBuilder.array([]),
  });
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    if (this.editMode) {
      this.recipeService.getRecipeById(this.id ?? '').then((recipe) => {
        this.recipeForm.setValue({
          name: recipe.name,
          description: recipe.description,
          imageURL: recipe.imageURL,
          ingredients: [],
        });
        for (let ingredient of recipe.ingredients) {
          this.ingredients.push(
            this.formBuilder.group({
              name: ingredient.name,
              quantity: ingredient.quantity,
            })
          );
        }
      });
    }
  }
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
    if (this.editMode) {
      await this.recipeService.updateRecipe(
        this.recipeForm.value as Recipe,
        this.id ?? ''
      );
    } else {
      await this.recipeService.addRecipe(this.recipeForm.value as Recipe);
    }
    this.router.navigate(['/recipes']);
  }
  handleCancelEdit() {
    this.router.navigate(['/recipes']);
  }
}
