import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-inputfield',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-inputfield.component.html',
  styleUrl: './register-inputfield.component.scss',
})
export class RegisterInputfieldComponent {
  @Input() name!: string;
  @Input() imgSrc!: string;
  inputValue!: string;
  showPasswordRequirements = false;

  onfocusPassword() {
    if (this.name === 'Passwort') {
      this.showPasswordRequirements = true;
    }
  }

  onblurPassword() {
    if (this.name === 'Passwort') {
      this.showPasswordRequirements = false;
    }
  }

  getInputType() {
    if (this.name === 'Passwort' || this.name === 'Passwort wiederholen') {
      return 'password';
    } else {
      return 'text';
    }
  }

  passwordIsLongEnough() {
    return (
      this.name === 'Passwort' &&
      this.inputValue &&
      this.inputValue.length >= 10
    );
  }

  passwordHasCapitalLetter() {
    const capitalLetter = /[A-Z]/;
    return (
      this.name === 'Passwort' &&
      this.inputValue &&
      capitalLetter.test(this.inputValue)
    );
  }

  passwordContainsNumber() {
    const number = /[0-9]/;
    return (
      this.name === 'Passwort' &&
      this.inputValue &&
      number.test(this.inputValue)
    );
  }
}
