import { Component } from '@angular/core';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  constructor(private logInAndRegisterService: LogInAndRegisterService) {
    this.logInAndRegisterService.loggedIn = true;
  }
}
