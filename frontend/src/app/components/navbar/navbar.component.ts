import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { CategoriesComponent } from './categories/categories.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, SearchComponent, UserMenuComponent, CategoriesComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
