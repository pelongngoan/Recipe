import { Component, EventEmitter, Output } from '@angular/core';

import { Recipe } from '../../recipe';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeService } from '../../recipe.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  imports: [RecipeItemComponent, CommonModule, RouterLink],
})
export class RecipeListComponent {
  @Output() recipeThatSelected = new EventEmitter<string>();
  url = 'http://localhost:3000/recipes';
  recipeList: Recipe[] = [];
  title = 'Recipe';
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getAllRecipe().then((data: Recipe[]) => {
      this.recipeList = data;
      console.log(this.recipeList);
    });
  }
  async getAllRecipe(): Promise<Recipe[]> {
    const data = await fetch(this.url);

    return (await data.json()) ?? [];
  }
  onNewRecipe() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }

  handleSelectItem(arg0: string | undefined) {
    this.recipeThatSelected.emit(arg0?.toString());
  }
}
