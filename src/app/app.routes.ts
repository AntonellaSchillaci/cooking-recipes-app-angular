import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MealDetailComponent } from './pages/meal-detail/meal-detail';
import { FavoritesService } from './core/services/favorites.service';
import { FavoritesPageComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meal/:id', component: MealDetailComponent },
  { path: 'favorites', component: FavoritesPageComponent }
];
