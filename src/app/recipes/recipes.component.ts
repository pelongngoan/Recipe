import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {}
