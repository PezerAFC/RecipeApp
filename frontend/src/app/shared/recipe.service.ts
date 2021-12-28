import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../recipe';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipe: Recipe;
  private baseUri: string = "http://localhost:8081";
  private headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient) { }

  createRecipe(recipe: Recipe) {
    return this.http.post(this.baseUri + '/create', recipe, { headers: this.headers });
  }

  getRecipes(params: any): Observable<any> {
    return this.http.get<Recipe[]>(this.baseUri + '/read', { headers: this.headers, params });
  }
  getRecipesbyName(inputName: String): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUri + '/search/' + inputName, { headers: this.headers });
  }
  getRecipesbyIng(inputIng: String): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUri + '/search/ing/' + inputIng, { headers: this.headers });
  }

  updateRecipe(recipe: Recipe) {
    return this.http.put(this.baseUri + '/update', recipe, { headers: this.headers });
  }

  deleteRecipe(id: string) {
    return this.http.delete(this.baseUri + '/delete/' + id, { headers: this.headers });
  }

  setter(recipe: Recipe) {
    this.recipe = recipe;
  }
  getter() {
    return this.recipe;
  }
}


