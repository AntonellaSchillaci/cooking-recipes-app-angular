import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MealDetailComponent } from './pages/meal-detail/meal-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'meal/:id', component: MealDetailComponent }
];
