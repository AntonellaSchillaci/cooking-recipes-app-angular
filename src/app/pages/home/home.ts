import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MealService } from '../../core/services/meal';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');
  meals: any[] = [];
  filteredMeals: any[] = [];

  constructor(
    private mealService: MealService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mealService.searchMeals('a').subscribe((res) => {
      this.meals = res.meals || [];
      this.filteredMeals = [...this.meals];
      this.cdr.detectChanges();
      console.log('Ricette caricate:', this.filteredMeals.length);
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term: string | null) => {
        const value = term?.toLowerCase() || '';
        this.filteredMeals = this.meals.filter((meal) =>
          meal.strMeal.toLowerCase().includes(value)
        );
        this.cdr.detectChanges();
        console.log('Ricette filtrate:', this.filteredMeals.length);
      });
  }

}
