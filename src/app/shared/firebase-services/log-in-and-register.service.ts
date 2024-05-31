import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogInAndRegisterService {
 /*  firestore: Firestore = inject(Firestore); */
  loggedIn: boolean;

  constructor() {
    this.loggedIn = false;
  }
}
