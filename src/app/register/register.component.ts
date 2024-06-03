import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  acceptTerms = false;
  showPasswordRequirements = false;

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
    return this.name || this.email || this.password || this.confirmPassword;
  }

  termsWereAccepted() {
    return this.acceptTerms;
  }

  passwordRequirementsAreFulfilled() {
    return (
      this.passwordIsLongEnough() ||
      this.passwordHasCapitalLetter() ||
      this.passwordContainsNumber()
    );
  }

  passwordsMatch(){
    return this.password === this.confirmPassword
  }

  onFocusPassword() {
    this.showPasswordRequirements = true;
  }

  onBlurPassword() {
    this.showPasswordRequirements = false;
  }

  passwordIsLongEnough() {
    return this.password && this.password.length >= 10;
  }

  passwordHasCapitalLetter() {
    const capitalLetter = /[A-Z]/;
    return this.password && capitalLetter.test(this.password);
  }

  passwordContainsNumber() {
    const number = /[0-9]/;
    return this.password && number.test(this.password);
  }
}
