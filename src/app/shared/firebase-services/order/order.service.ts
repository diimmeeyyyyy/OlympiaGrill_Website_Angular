import { inject, Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  firestore: Firestore = inject(Firestore);
  userService = inject(UserService);

  constructor() {}

  getOrder(orderID: string) {}

  getUsersRef() {
    let orders = collection(this.firestore, 'orders');
    return orders;
  }
}
