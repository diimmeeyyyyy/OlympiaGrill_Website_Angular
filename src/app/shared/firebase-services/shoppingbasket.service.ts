import { inject, Injectable } from '@angular/core';
import { ShoppingBasketItem } from '../../interfaces/shopping-basket-item.interface';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ShoppingbasketService {
  firestore: Firestore = inject(Firestore);

  shoppingBasket: ShoppingBasketItem[] = [];
  totalItemAmount = this.shoppingBasket.reduce(
    (total, item) => total + item.amount,
    0
  );
  nextId: number = 0;

  constructor() {}

  async addToShoppingBasket(item: ShoppingBasketItem) {
    /* await addDoc(this.getShoppingBasketRef(), item); */
    this.shoppingBasket.push(item);
    this.totalItemAmount += item.amount;
    //CATCH & THEN
  }

  /* getShoppingBasketRef() {
    return collection(this.firestore, 'shoppingBasket');
  } */

  /* =================================================
  TO CHECK IF ITEM ALREADY EXISTS IN SHOPPING-BASKET
  =====================================================*/
  checkIfDishAlreadyExistsInBasket(item: ShoppingBasketItem) {
    if (this.dishAlreadyExistsInBasket(item)) {
      let index = this.getDishIndex(item);
      this.increaseDishAmount(index);
    } else {
      item.id = this.nextId++;
      this.addToShoppingBasket(item);
    }
  }

  increaseDishAmount(index: number) {
    this.totalItemAmount++;
    this.shoppingBasket[index].amount++;
  }

  dishAlreadyExistsInBasket(dish: ShoppingBasketItem) {
    const index = this.getDishIndex(dish);
    return index !== -1;
  }

  getDishIndex(dish: ShoppingBasketItem) {
    const index = this.shoppingBasket.findIndex(
      (basketItem) =>
        basketItem.title === dish.title &&
        basketItem.foodClass === dish.foodClass &&
        basketItem.salad === dish.salad &&
        basketItem.bifteki === dish.bifteki &&
        basketItem.gyrosSpecial === dish.gyrosSpecial &&
        basketItem.sides === dish.sides &&
        basketItem.toppings &&
        dish.toppings &&
        this.compareToppings(basketItem.toppings, dish.toppings)
    );
    return index;
  }

  compareToppings(toppings1: string[], toppings2: string[]) {
    if (toppings1.length !== toppings2.length) {
      return false;
    }
    for (let i = 0; i < toppings1.length; i++) {
      if (toppings1[i] !== toppings2[i]) {
        return false;
      }
    }
    return true;
  }

  async requestOrder(order: any) {
    console.log('Bestellanfrage wurde gesendet');
    await addDoc(this.getRequestOrderRef(), order);
  }

  getRequestOrderRef() {
    let requestOrder = collection(this.firestore, 'orderRequests');
    return requestOrder;
  }

  /*  async addUser(user: User) {
    await addDoc(this.getRegisteredUsersRef(), user);
  }

  getRegisteredUsersRef() {
    const registeredUsers = collection(this.firestore, 'registeredUsers');
    return registeredUsers;
  } */
}
