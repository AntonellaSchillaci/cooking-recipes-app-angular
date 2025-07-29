import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private api = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  searchMeals(term: string): Observable<any> {
    return this.http.get(`${this.api}search.php?s=${term}`);
  }

  getMealDetails(id: string): Observable<any> {
    return this.http.get(`${this.api}lookup.php?i=${id}`);
  }

  getAllMeals(): Observable<any> {
    return this.http.get(`${this.api}search.php?s=`);
  }
}
