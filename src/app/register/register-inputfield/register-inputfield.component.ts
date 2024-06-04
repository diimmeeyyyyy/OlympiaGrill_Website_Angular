import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() valueChange = new EventEmitter<string>();
  showPasswordRequirements = false;
  showPassword = false;

  @ViewChild('inputfield') inputfield!: ElementRef;

  private _value!: string;

  @Input()
  get value(): string {
    return this._value;
  }

  set value(v: string) {
    if (v !== this._value) {
      this._value = v;
      this.valueChange.emit(this._value);
    }
  }

  onfocusPassword() {
    if (this.name === 'Passwort') {
      this.showPasswordRequirements = true;
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
    if (this.name === 'Passwort') {
      this.showPasswordRequirements = true;
      if (!this.showPassword) {
        this.showPassword = true;
        this.imgSrc = '/assets/img/visibility.png';
      } else {
        this.showPassword = false;
        this.imgSrc = '/assets/img/visibility_off.png';
      }
      this.inputfield.nativeElement.focus();
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
    return this.name === 'Passwort' && this.value && this.value.length >= 10;
  }

  passwordHasCapitalLetter() {
    const capitalLetter = /[A-Z]/;
    return (
      this.name === 'Passwort' && this.value && capitalLetter.test(this.value)
    );
  }

  passwordContainsNumber() {
    const number = /[0-9]/;
    return this.name === 'Passwort' && this.value && number.test(this.value);
  }
}
