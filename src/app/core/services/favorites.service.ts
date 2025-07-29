import { Injectable, signal } from '@angular/core';
import { Meal } from '../../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private key = 'favoriteMeals';
  favorites = signal<Meal[]>(this.loadFavorites());

  private loadFavorites(): Meal[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private saveFavorites(): void {
    localStorage.setItem(this.key, JSON.stringify(this.favorites()));
  }

  add(meal: Meal): void {
    if (!this.isFavorite(meal.idMeal)) {
      this.favorites.update((favs) => [...favs, meal]);
      this.saveFavorites();
    }
  }

  remove(id: string): void {
    this.favorites.update((favs) => favs.filter((m) => m.idMeal !== id));
    this.saveFavorites();
  }

  isFavorite(id: string): boolean {
    return this.favorites().some((m) => m.idMeal === id);
  }
}
