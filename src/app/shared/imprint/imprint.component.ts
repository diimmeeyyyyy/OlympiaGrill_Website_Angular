import { Component } from '@angular/core';
import { LogInAndRegisterService } from '../firebase-services/log-in-and-register/log-in-and-register.service';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent {
  constructor(private logInAndRegisterService: LogInAndRegisterService) {
    this.logInAndRegisterService.loggedIn = true;
  }
}
