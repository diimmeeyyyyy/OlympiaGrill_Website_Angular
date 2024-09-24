import { CommonModule } from '@angular/common';
import { Component, ViewChildren, QueryList, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogInAndRegisterService } from '../shared/firebase-services/log-in-and-register/log-in-and-register.service';
import { User } from '../shared/interfaces/user.interface';
import { RegisterInputfieldComponent } from './register-inputfield/register-inputfield.component';
import { Router } from '@angular/router';
import { AuthentificationService } from '../shared/firebase-services/authentification/authentification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterInputfieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthentificationService);

  constructor(
    private registerService: LogInAndRegisterService,
    private router: Router
  ) {}

  acceptTerms = false;
  registrationSuccess = false;
  countdown = 5;

  inputfields = [
    {
      name: 'Name',
      imgSrc: '/assets/img/register-name.png',
      value: '',
    },
    {
      name: 'E-Mail',
      imgSrc: '/assets/img/register-email.png',
      value: '',
    },
    {
      name: 'Passwort',
      imgSrc: '/assets/img/register-password.png',
      value: '',
    },
    {
      name: 'Passwort wiederholen',
      imgSrc: '/assets/img/register-password.png',
      value: '',
    },
  ];

  async signUpUser() {
    let email = this.inputfields[1].value;
    let emailExists = await this.registerService.checkIfEmailExists(email);

    if (!emailExists) {
      let password = this.inputfields[2].value;
      const uid = await this.authService.mailSignUp(email, password);
      let user: User = this.userObject(uid);
      this.registerService.addUser(user);
      this.clearInputfields();
      this.successfullyRegistrationMessage();
    } else {
      alert('EMAIL EXISTIERT BEREITS');
    }
  }

  userObject(uid: string) {
    return {
      docId: '',
      name: this.inputfields[0].value,
      email: this.inputfields[1].value,
      orders: [],
      uId: uid,
    };
  }

  successfullyRegistrationMessage() {
    this.registrationSuccess = true;
    this.startCountdown();
  }

  startCountdown() {
    const intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(intervalId);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  clearInputfields() {
    this.inputfields.forEach((field) => {
      field.value = '';
    });
  }

  checkRegisterRequirements() {
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
  }

  allInputfieldsHaveValue() {
    return (
      this.inputfields[0].value &&
      this.inputfields[1].value &&
      this.inputfields[2].value &&
      this.inputfields[3].value
    );
  }

  termsWereAccepted() {
    return this.acceptTerms;
  }

  passwordRequirementsAreFulfilled() {
    return (
      this.passwordIsLongEnough() &&
      this.passwordHasCapitalLetter() &&
      this.passwordContainsNumber()
    );
  }

  passwordIsLongEnough() {
    return this.inputfields[2].value.length >= 10;
  }

  passwordHasCapitalLetter() {
    const capitalLetter = /[A-Z]/;
    return (
      this.inputfields[2].value && capitalLetter.test(this.inputfields[2].value)
    );
  }

  passwordContainsNumber() {
    const number = /[0-9]/;
    return this.inputfields[2].value && number.test(this.inputfields[2].value);
  }

  passwordsMatch() {
    return this.inputfields[2].value === this.inputfields[3].value;
  }

  navigateToLogIn() {
    this.router.navigateByUrl('/');
  }
}
