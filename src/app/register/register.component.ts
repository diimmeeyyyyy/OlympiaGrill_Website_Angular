import { CommonModule } from '@angular/common';
import { Component, ViewChildren, QueryList } from '@angular/core';
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

  acceptTerms = false;

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

  addUser() {
    debugger;
    let user: User = {
      name: this.inputfields[0].value,
      email: this.inputfields[1].value,
      password: this.inputfields[2].value,
    };
    this.registerService.addUser(user);
    this.clearInputfields();
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
}
