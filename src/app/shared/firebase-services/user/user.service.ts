import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
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

  async getUserByID(id: string): Promise<User | null> {
    const userDocRef = doc(this.firestore, 'users', id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as User;
    } else {
      return null;
    }
  }

  async updateUser(user: User) {
    debugger;
    try {
      if (!user.id) {
        throw new Error('User ID is missing');
      }
      const userDocRef = doc(this.firestore, 'users', user.id);
      await updateDoc(userDocRef, { ...user });
      console.log('User updated successfully');
    } catch (err) {
      console.error('ERROR UPDATING DATA', err);
    }
  }
}
