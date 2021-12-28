import { RecipeService } from './../../shared/recipe.service';
import { Recipe } from 'src/app/recipe';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  newRecipe(event: any) {
    event.preventDefault();
    this.recipeService.setter(new Recipe());
    this.router.navigate(['/createUpdate']);

  }
}
