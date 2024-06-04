import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

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
  showPassword = false;
  comingFromInput = false;
  @ViewChild('inputfield') inputfield!: ElementRef;

  onfocusPassword() {
    if (this.name === 'Passwort') {
      this.showPasswordRequirements = true;
      this.comingFromInput = true;
      if (this.showPassword) {
        this.imgSrc = '/assets/img/visibility.png';
      } else {
        this.imgSrc = '/assets/img/visibility_off.png';
      }
    } else {
      this.showPasswordRequirements = false;
    }
  }

  onblurPassword() {
    if (this.name === 'Passwort') {
      this.showPassword = false;
      this.imgSrc = '/assets/img/register-password.png';
      this.getInputType();
    }
    this.showPasswordRequirements = false;
  }

  passwordVisibility() {
    debugger;
    if (this.name === 'Passwort') {
      this.showPasswordRequirements = true;
      if (!this.showPassword) {
        this.showPassword = true;
        this.imgSrc = '/assets/img/visibility.png';
      } else {
        this.showPassword = false;
        this.imgSrc = '/assets/img/visibility_off.png';
      }
      /*  this.inputfield.nativeElement.focus(); */
      this.getInputType();
    }
  }

  getInputType(): string {
    if (
      (this.name === 'Passwort' || this.name === 'Passwort wiederholen') &&
      !this.showPassword
    ) {
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
