import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Dish } from '../../interfaces/dish.interface';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { FoodClass } from '../../interfaces/food-class.interface';

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

  foodClassTX: FoodClass[] = [];
  foodClassS: FoodClass[] = [];
  unsubFoodClassTX;
  unsubFoodClassS;

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
    //FOOD-CLASS-TX
    this.unsubFoodClassTX = this.subFoodClass('TX');
    //FOOD-CLASS-S
    this.unsubFoodClassS = this.subFoodClass('foodClassS');
  }

  subPopularDishesList() {
    return onSnapshot(this.getFoodTypeRef('popularDishes'), (list) => {
      list.forEach((dish) => {
        this.popularDishes.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subSaladList() {
    return onSnapshot(this.getFoodTypeRef('salads'), (list) => {
      list.forEach((dish) => {
        this.salads.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subSidesList() {
    return onSnapshot(this.getFoodTypeRef('sides'), (list) => {
      list.forEach((dish) => {
        this.sides.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subAppetizersList() {
    return onSnapshot(this.getFoodTypeRef('appetizers'), (list) => {
      list.forEach((dish) => {
        this.appetizers.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subFastDishes() {
    return onSnapshot(this.getFoodTypeRef('fastDishes'), (list) => {
      list.forEach((dish) => {
        this.fastDishes.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  subChildren() {
    return onSnapshot(this.getFoodTypeRef('kinder'), (list) => {
      list.forEach((dish) => {
        this.kids.push(this.setDishObject(dish.data(), dish.id));
      });
    });
  }

  //FOOD-CLASSES
  subFoodClass(foodClass: string) {
    return onSnapshot(this.getFoodClassRef(foodClass), (list) => {
      list.forEach((topping) => {
        if (foodClass === 'TX') {
          this.foodClassTX.push(this.setFoodClassObject(topping.data()));
        } else if (foodClass === 'foodClassS') {
          this.foodClassS.push(this.setFoodClassObject(topping.data()));
        }
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
  getFoodTypeRef(foodType: string) {
    const dishCollection = collection(this.firestore, foodType);
    const dishQuery = query(dishCollection, orderBy('order'));
    return dishQuery;
  }

  getFoodClassRef(foodClass: string) {
    const foodClassCollection = collection(this.firestore, foodClass);
    const foodClassQuery = query(foodClassCollection, orderBy('order'));
    return foodClassQuery;
  }

  setDishObject(obj: any, id: string): Dish {
    return {
      id: id,
      title: obj.title,
      description: obj.description || '',
      price: obj.price,
      background: obj.background || '',
      foodClass: obj.foodClass || '',
    };
  }

  setFoodClassObject(obj: any): FoodClass {
    return {
      title: obj.title || '',
      price: obj.price || '',
    };
  }
}
