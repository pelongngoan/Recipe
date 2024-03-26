import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
export class RecipeListComponent implements OnInit {
  @Output() headerShow = new EventEmitter<boolean>();
  recipeList: Recipe[] = [];
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.recipeService.getAllRecipe().then((data: Recipe[]) => {
      this.recipeList = data;
    });
  }
  handleNewRecipeClicked() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.handleHeaderShown();
  }
  handleHeaderShown() {
    this.headerShow.emit(false);
  }
}
