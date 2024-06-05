import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LogInAndRegisterService {
  firestore: Firestore = inject(Firestore);
  loggedIn: boolean;

  registeredUsers: User[] = [];
  unsubRegisteredUser;

  constructor() {
    this.loggedIn = false;
    this.unsubRegisteredUser = this.subUser();
  }

  ngonDestroy() {
    this.unsubRegisteredUser();
  }

  subUser() {
    return onSnapshot(this.getRegisteredUsersRef(), (list) => {
      list.forEach((user) => {
        this.registeredUsers.push(this.setUserObject(user.data()));
      });
    });
  }

  setUserObject(obj: any): User {
    return {
      name: obj.name,
      email: obj.email,
      password: obj.password,
    };
  }

  async addUser(user: User) {
    await addDoc(this.getRegisteredUsersRef(), user);
  }

  getRegisteredUsersRef() {
    const registeredUsers = collection(this.firestore, 'registeredUsers');
    return registeredUsers;
  }
}
