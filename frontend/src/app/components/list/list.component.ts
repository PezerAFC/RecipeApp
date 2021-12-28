import { RecipeService } from './../../shared/recipe.service';
import { Recipe } from 'src/app/recipe';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public recipes: Recipe[];
  public inputName: String;
  public inputIng: String;
  public currentIndex = -1;
  public page: 1;
  public count: 0;
  public pageSize = 5;
  public pageSizes = [5, 10, 15];
  public search = false;
  constructor(private _recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  resetSearchBars() {
    this.inputIng = "";
    this.inputName = "";
  }

  getRequestParams(page: number, tableSize: number): any {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (tableSize) {
      params['size'] = tableSize;
    }
    return params;
  }
  handlePageChange(event: any) {
    this.page = event;
    this.getRecipes();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getRecipes();
  }
  getRecipes() {
    const params = this.getRequestParams(this.page, this.pageSize)
    this._recipeService.getRecipes(params).subscribe({
      next: (data) => {
        const { recipes, totalItems } = data;
        this.recipes = recipes;
        this.count = totalItems;
        this.search = false;
      },
      error: (error) => console.log(error),
    })
  };
  getRecipesbyName() {
    this._recipeService.getRecipesbyName(this.inputName).subscribe({
      next: (data) => {
        this.recipes = data;
        this.resetSearchBars();
        this.search = true;
      },
      error: (error) => console.log(error),
    })
  }
  getRecipesbyIng() {
    this._recipeService.getRecipesbyIng(this.inputIng).subscribe({
      next: (data) => {
        this.recipes = data;
        this.resetSearchBars();
        this.search = true;
      },
      error: (error) => console.log(error),
    })
  }

  doUpdate(recipe: Recipe) {
    this._recipeService.setter(recipe);
    this.router.navigate(['/createUpdate']);
  }
  doDelete(recipe: any) {
    this._recipeService.deleteRecipe(recipe._id).subscribe({
      next: () => {
        this.recipes.splice(this.recipes.indexOf(recipe), 1);
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
