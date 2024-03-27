import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredients } from '../ingredients';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Recipe } from '../recipe';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingItem } from '../shopping-item';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ShoppingListComponent implements OnInit {
  shoppingItems: ShoppingItem[] | undefined;
  shoppingItem: ShoppingItem | undefined;
  ingredientForm: FormGroup | undefined;

  editMode: boolean | undefined;
  constructor(
    private shoppingListService: ShoppingListService,
    private formBuilder: FormBuilder,

    private router: Router
  ) {}
  ngOnInit(): void {
    this.ingredientForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, this.quantityValidator]],
    });
    this.editMode = false;
    this.shoppingListService.getAllShoppingItem().then((shoppingItem) => {
      this.shoppingItems = shoppingItem;
    });
  }
  onEditItem(shoppingItem: ShoppingItem) {
    this.editMode = true;
    this.shoppingItem = shoppingItem;
    this.ingredientForm?.patchValue(shoppingItem);
  }
  quantityValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value <= 0) {
      return { invalidQuantity: { value: 'Quantity must be greater than 0' } };
    }
    return null;
  }
  getQuantityValidity(): any {
    const control = this.ingredientForm?.get('quantity');
    if (control !== null && !control?.touched) {
      return null;
    }
    if (control?.errors?.['required']) {
      return 'Quantity is required';
    }
    if (control?.errors?.['invalidQuantity']) {
      return 'Quantity must be greater than 0';
    }
    return null;
  }
  async handleUpdate() {
    if (this.editMode) {
      this.shoppingListService.updateShoppingItem(
        this.ingredientForm?.value,
        this.shoppingItem?.id ?? ''
      );
    } else {
      this.shoppingListService.addShoppingItem(this.ingredientForm?.value);
    }
    this.shoppingItems = await this.shoppingListService.getAllShoppingItem();
    this.handleClear();
  }
  handleDelete() {
    this.shoppingListService.deleteShoppingItem(this.shoppingItem?.id ?? '');
    this.shoppingItems = this.shoppingItems?.filter(
      (i) => i.id !== this.shoppingItem?.id
    );
    this.handleClear();
    this.router.navigate(['/shopping-list']);
  }
  handleClear() {
    this.ingredientForm?.setValue({
      name: '',
      quantity: 0,
    });
    this.editMode = false;
  }
}
