import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LogInComponent } from './log-in/log-in.component';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { LogInAndRegisterService } from './shared/firebase-services/log-in-and-register/log-in-and-register.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LogInComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'olympiaGrill';

  constructor(public logInAndRegisterService: LogInAndRegisterService) {}

  checkIfLoggedIn() {
    if (this.logInAndRegisterService.loggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
