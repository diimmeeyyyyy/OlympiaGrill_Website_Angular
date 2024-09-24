import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUser: User | null = null;
  firestore: Firestore = inject(Firestore);
  constructor() {
    this.loadActiveUser();
  }

  async loadActiveUser() {
    let uId = sessionStorage.getItem('loggedInUser');
    if (uId) {
      uId = uId.slice(1, -1);
      let user = await this.getUserByUserId(uId);
      debugger;
      this.activeUser = user;
    }
  }

  setActiveUser(user: User) {
    this.activeUser = user;
  }

  async getUserByID(id: string): Promise<User | null> {
    const userDocRef = doc(this.firestore, 'users', id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      debugger;
      console.log(docSnap.data() as User);

      return docSnap.data() as User;
    } else {
      return null;
    }
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('uId', '==', userId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as User;
    } else {
      return null;
    }
  }

  async updateUser(user: User) {
    try {
      if (!user.docId) {
        throw new Error('User ID is missing');
      }
      const userDocRef = doc(this.firestore, 'users', user.docId);
      await updateDoc(userDocRef, { ...user });
      console.log('User updated successfully');
    } catch (err) {
      console.error('ERROR UPDATING DATA', err);
    }
  }
}
