import { inject, Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  activeUser: User | null = null;

  setActiveUser(user: User) {
    this.activeUser = user;
  }

  async updateUser(user: User) {
    debugger;
    try {
      if (!user.id) {
        throw new Error('User ID is missing');
      }
      debugger;
      const userDocRef = doc(this.firestore, 'users', user.id);
      await updateDoc(userDocRef, { ...user });
      console.log('User updated successfully');
    } catch (err) {
      console.error('ERROR UPDATING DATA', err);
    }
  }
}
