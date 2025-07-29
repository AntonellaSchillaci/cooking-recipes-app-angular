import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MealService } from '../../core/services/meal';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meal-detail.html',
  styleUrls: ['./meal-detail.scss'],
})
export class MealDetailComponent implements OnInit {
  meal: any = null;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mealService.getMealDetails(id).subscribe((res) => {
        this.meal = res.meals[0];
      });
    }
  }
  getIngredients(meal: any): string[] {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`.trim());
      }
    }
    return ingredients;
  }

  goHome() {
    this.router.navigateByUrl('');
  }

  toggleFavorite() {
    if (this.meal) {
      this.favoritesService.isFavorite(this.meal.idMeal)
        ? this.favoritesService.remove(this.meal.idMeal)
        : this.favoritesService.add(this.meal);
    }
  }
  isFav(): boolean {
    return this.meal ? this.favoritesService.isFavorite(this.meal.idMeal) : false;
  }
}
