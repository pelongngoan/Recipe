import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../recipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe | undefined;
  @Output() headerShow = new EventEmitter<boolean>();
  constructor(private router: Router, private route: ActivatedRoute) {}
  handleItemClicked() {
    this.router.navigate(['detail', this.recipe?.id], {
      relativeTo: this.route,
    });
    this.headerShow.emit(false);
  }
}
