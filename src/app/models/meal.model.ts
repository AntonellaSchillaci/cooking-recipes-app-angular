export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;

  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}
