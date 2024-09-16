import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register/log-in-and-register.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent {
  constructor(
    public logInAndRegisterService: LogInAndRegisterService
  ) {
    this.logInAndRegisterService.loggedIn = true;
  }
}
