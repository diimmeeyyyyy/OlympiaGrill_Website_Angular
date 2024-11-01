import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, onSnapshot } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { Order } from '../../interfaces/order.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  firestore: Firestore = inject(Firestore);
  userService = inject(UserService);
  myOrders: Order[] = [];

  /* =====================
  STATUS CHANGE OBSERVABLE
  ========================*/
  updateStatus(docID:string){
    onSnapshot(doc(this.firestore, 'orders', docID), (doc) => {
      console.log('Current data: ', doc.data());
    });
  }
  /* statusChanged = new BehaviorSubject<string>(); */

  /* private _status: string | undefined;

  get status(): string | undefined {
    return this._status;
  }

  set status(newStatus: string) {
    this._status = newStatus;
    this.statusChanged.next(newStatus);
  } */

  /* ============================== */

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
