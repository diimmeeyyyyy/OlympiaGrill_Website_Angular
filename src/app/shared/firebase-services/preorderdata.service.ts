import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dish } from '../../interfaces/dish.interface';

@Injectable({
  providedIn: 'root',
})
export class PreorderdataService {
  firestore: Firestore = inject(Firestore);

  popularDishes: Dish[] = [];
  salads: Dish[] = [];
  sides: Dish[] = [];
  appetizers: Dish[] = [];
  fastDishes: Dish[] = [];
  kids: Dish[] = [];

  unsubPopularDishes;
  unsubSalads;
  unsubSides;
  unsubAppetizers;
  unsubFastDishes;
  unsubChildren;

  constructor() {
    //POPULAR DISHES
    this.unsubPopularDishes = this.subPopularDishesList();
    //SALADS
    this.unsubSalads = this.subSaladList();
    //SIDES
    this.unsubSides = this.subSidesList();
    //APPETIZERS
    this.unsubAppetizers = this.subAppetizersList();
    //FAST DISHES
    this.unsubFastDishes = this.subFastDishes();
    //CHILDS
    this.unsubChildren = this.subChildren();
  }

  subPopularDishesList() {
    return onSnapshot(this.getPopularDishesRef(), (list) => {
      list.forEach((dish) => {
        this.popularDishes.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subSaladList() {
    return onSnapshot(this.getSaladsRef(), (list) => {
      list.forEach((dish) => {
        this.salads.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subSidesList() {
    return onSnapshot(this.getSidesRef(), (list) => {
      list.forEach((dish) => {
        this.sides.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subAppetizersList() {
    return onSnapshot(this.getAppetizersRef(), (list) => {
      list.forEach((dish) => {
        this.appetizers.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subFastDishes() {
    return onSnapshot(this.getFastDishesRef(), (list) => {
      list.forEach((dish) => {
        this.fastDishes.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subChildren() {
    return onSnapshot(this.getKinderRef(), (list) => {
      list.forEach((dish) => {
        this.kids.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  ngonDestroy() {
    this.unsubPopularDishes();
    this.unsubSalads();
    this.unsubSides();
    this.unsubAppetizers();
    this.unsubFastDishes();
  }

  //Um auf die jeweilige Collection zuzugreifen:
  getPopularDishesRef() {
    return collection(this.firestore, 'popularDishes');
  }

  getSaladsRef() {
    return collection(this.firestore, 'salads');
  }

  getSidesRef() {
    return collection(this.firestore, 'sides');
  }

  getAppetizersRef() {
    return collection(this.firestore, 'appetizers');
  }

  getFastDishesRef() {
    return collection(this.firestore, 'fastDishes');
  }

  getKinderRef() {
    return collection(this.firestore, 'kinder');
  }

  /*  getSingleDocRef(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId);
  } */

  setDishObject(obj: any, id: string): Dish {
    return {
      id: id,
      title: obj.title,
      description: obj.description || '',
      price: obj.price,
      background: obj.background || '',
    };
  }
}
