import { Component, OnInit } from '@angular/core';
import { RecipeService } from './../../shared/recipe.service';
import { Recipe } from 'src/app/recipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {
  public recipe: Recipe;
  public isValid: false;
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipe = this.recipeService.getter();
    this.isValid = false;
  }
  createOrUpdate() {
    if (this.recipe._id == undefined) {
      this.recipeService.createRecipe(this.recipe).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.recipeService.updateRecipe(this.recipe).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
