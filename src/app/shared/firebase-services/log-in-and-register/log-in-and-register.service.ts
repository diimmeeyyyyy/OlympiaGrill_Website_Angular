import { Injectable, inject } from '@angular/core';
import {
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LogInAndRegisterService {
  firestore: Firestore = inject(Firestore);
  userService = inject(UserService);
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
    return onSnapshot(this.getUsersRef(), (list) => {
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
    //todo überprüfen, es bereits einen User mit der E-Mail gibt
    try {
      const docRef: DocumentReference = await addDoc(this.getUsersRef(), user);
      user.id = docRef.id;
      await this.userService.updateUser(user);
    } catch (err) {
      console.error('Error updating Data', err);
    }
  }

  getUsersRef() {
    const registeredUsers = collection(this.firestore, 'users');
    return registeredUsers;
  }
}
