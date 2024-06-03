import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LogInAndRegisterService {
  firestore: Firestore = inject(Firestore);
  loggedIn: boolean;

  constructor() {
    this.loggedIn = false;
  }

  
  async addUser(user: User) {
    await addDoc(this.getRegisteredUsersRef(), user);
  }

  getRegisteredUsersRef() {
    const registeredUsers = collection(this.firestore, 'registeredUsers');
    return registeredUsers;
  }
}
