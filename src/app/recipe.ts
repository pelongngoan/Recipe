export interface Recipe {
  id: Number;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: [
    {
      name: string;
      amount: number;
    }
  ];
}
