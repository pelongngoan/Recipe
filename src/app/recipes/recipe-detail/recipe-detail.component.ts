import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeService.getRecipeById(params['id']).then((recipe) => {
        this.recipe = recipe;
      });
    });
  }
  handleAddToShoppingList() {
    this.router.navigate(['/shopping-list', this.recipe?.id]);
  }
  handleEditRecipe() {
    this.router.navigate(['recipes/', 'edit', this.recipe?.id]);
  }
  handleDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe?.id as string);
    this.router.navigate(['/recipes']);
  }
}
