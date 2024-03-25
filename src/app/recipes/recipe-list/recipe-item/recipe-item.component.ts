import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../recipe';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe | undefined;
  @Input() index: number | undefined;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}
  handleSelectItem(arg0: string | undefined) {
    this.newItemEvent.emit(arg0?.toString());
  }
}
