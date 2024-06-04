import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register.service';
import { User } from '../interfaces/user.interface';
import { RegisterInputfieldComponent } from './register-inputfield/register-inputfield.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterInputfieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private registerService: LogInAndRegisterService) {}

  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  acceptTerms = false;
  showPasswordRequirements = false;

  inputfields = [
    {
      name: 'Name',
      imgSrc: '/assets/img/register-name.png',
    },
    {
      name: 'E-Mail',
      imgSrc: '/assets/img/register-email.png',
    },
    {
      name: 'Passwort',
      imgSrc: '/assets/img/register-password.png',
    },
    {
      name: 'Passwort wiederholen',
      imgSrc: '/assets/img/register-password.png',
    },
  ];

  addUser() {
    debugger;
    let user: User = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.registerService.addUser(user);
    this.clearInputfields();
  }

  clearInputfields() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

 /*  checkRegisterRequirements() {
    if (!this.allInputfieldsHaveValue()) {
      return false;
    }
    if (!this.termsWereAccepted()) {
      return false;
    }
    if (!this.passwordRequirementsAreFulfilled()) {
      return false;
    }
    if (!this.passwordsMatch()) {
      return false;
    }
    return true;
  } */

  /* allInputfieldsHaveValue() {
    return this.name || this.email || this.password || this.confirmPassword;
  } */

  termsWereAccepted() {
    return this.acceptTerms;
  }

 /*  passwordRequirementsAreFulfilled() {
    return (
      this.passwordIsLongEnough() ||
      this.passwordHasCapitalLetter() ||
      this.passwordContainsNumber()
    );
  } */

  passwordsMatch() {
    return this.password === this.confirmPassword;
  }

  onFocusPassword() {
    this.showPasswordRequirements = true;
  }

  onBlurPassword() {
    this.showPasswordRequirements = false;
  }
}
