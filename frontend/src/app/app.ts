import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/modals/register-modal/register-modal.component';
import { RentModalComponent } from './components/modals/rent-modal/rent-modal.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoginModalComponent, RegisterModalComponent, RentModalComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
