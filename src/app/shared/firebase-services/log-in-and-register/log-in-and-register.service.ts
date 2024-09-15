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
  guestLoggedIn: boolean;
  userLoggedIn: boolean;
  loggedIn: boolean;
  loggedInUser!: User;

  users: User[] = [];
  unsubRegisteredUser;

  constructor() {
    this.guestLoggedIn = false;
    this.userLoggedIn = false;
    this.loggedIn = false;
    this.unsubRegisteredUser = this.subUser();
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }

  ngonDestroy() {
    this.unsubRegisteredUser();
  }

  subUser() {
    return onSnapshot(this.getRegisteredUsersRef(), (list) => {
      list.forEach((user) => {
        this.users.push(this.setUserObject(user.data()));
      });
    });
  }

  setUserObject(obj: any): User {
    return {
      name: obj.name,
      email: obj.email,
      password: obj.password,
      orders: obj.orders,
    };
  }

  async addUser(user: User) {
    await addDoc(this.getRegisteredUsersRef(), user);
  }

  getRegisteredUsersRef() {
    const registeredUsers = collection(this.firestore, 'users');
    return registeredUsers;
  }
}
