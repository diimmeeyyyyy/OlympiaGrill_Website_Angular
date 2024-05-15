import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dish } from '../../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class PreorderdataService {
  firestore: Firestore = inject(Firestore);

  popularDishes: Dish[] = [];

  unsubPopularDishes;
  unsubSalads;

  constructor() {
    //POPULAR DISHES
    this.unsubPopularDishes = onSnapshot(this.getPopularDishesRef(), (list) => {
      list.forEach((dish) => {
        console.log(this.setDishObject(dish.data(), dish.id));
      });
    });
    //OnSnapchot braucht eine Referenz und eine Funktion

    //SALADS
    this.unsubSalads = onSnapshot(this.getSaladsRef(), (list) => {
      list.forEach((dish) => {
        console.log(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  ngonDestroy() {
    this.unsubPopularDishes();
  }

  //Um auf die jeweilige Collection zuzugreifen:
  getPopularDishesRef() {
    return collection(this.firestore, 'popularDishes');
  }

  getSaladsRef() {
    return collection(this.firestore, 'salads');
  }

  getSingleDocRef(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId);
  }

  setDishObject(obj: any, id: string): Dish {
    return {
      id: id,
      title: obj.title,
      description: obj.description || '',
      price: obj.price,
    };
  }
}
