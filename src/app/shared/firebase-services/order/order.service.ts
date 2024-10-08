import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { Order } from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  firestore: Firestore = inject(Firestore);
  userService = inject(UserService);
  myOrders: Order[] = [];

  /* constructor() {
    this.loadMyOrders();
  } */

  async loadMyOrders() {
    if (this.userService.activeUser?.orders) {
      this.myOrders = [];
      for (let orderID of this.userService.activeUser.orders) {
        let order = await this.loadOrder(orderID);
        if (order) {
          this.myOrders.push(order);
        }
      }
      this.myOrders.sort((a, b) => b.timestamp - a.timestamp);
    }
  }

  async loadOrder(orderID: string): Promise<Order | null> {
    const docSnap = await getDoc(doc(this.firestore, 'orders', orderID));
    if (docSnap.exists()) {
      return docSnap.data() as Order;
    } else {
      return null;
    }
  }
}
