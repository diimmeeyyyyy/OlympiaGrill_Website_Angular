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

  unsubPopularDishes;
  unsubSalads;
  unsubSides;
  unsubAppetizers;
  unsubFastDishes;
  unsubChildren;
  unsubSchnitzel;
  unsubGrilledDishes;
  unsubGyrosDishes;
  unsubPita;

  popularDishes: Dish[] = [];
  salads: Dish[] = [];
  sides: Dish[] = [];
  appetizers: Dish[] = [];
  fastDishes: Dish[] = [];
  kids: Dish[] = [];
  schnitzel: Dish[] = [];
  grilledDishes: Dish[] = [];
  gyrosDishes: Dish[] = [];
  pita: Dish[] = [];

  unsubFoodClassTX;
  unsubFoodClassS;
  unsubFoodClassGR;
  unsubFoodClassPITA;
  unsubFoodClassGY;

  foodClassTX: FoodClass[] = [];
  foodClassS: FoodClass[] = [];
  foodClassGR: FoodClass[] = [];
  foodClassPITA: FoodClass[] = [];
  foodClassGY: FoodClass[] = [];

  constructor() {
    //POPULAR DISHES
    this.unsubPopularDishes = this.subFoodType(
      'popularDishes',
      this.popularDishes
    );
    //SALADS
    this.unsubSalads = this.subFoodType('salads', this.salads);
    //SIDES
    this.unsubSides = this.subFoodType('sides', this.sides);
    //APPETIZERS
    this.unsubAppetizers = this.subFoodType('appetizers', this.appetizers);
    //FAST DISHES
    this.unsubFastDishes = this.subFoodType('fastDishes', this.fastDishes);
    //CHILDS
    this.unsubChildren = this.subFoodType('kinder', this.kids);
    //SCHNITZEL
    this.unsubSchnitzel = this.subFoodType('schnitzel', this.schnitzel);
    //GRILL
    this.unsubGrilledDishes = this.subFoodType('grill', this.grilledDishes);
    //GYROS-DISHES
    this.unsubGyrosDishes = this.subFoodType('gyrosDishes', this.gyrosDishes);
    //PITA
    this.unsubPita = this.subFoodType('pita', this.pita);
    //FOOD-CLASS-TX
    this.unsubFoodClassTX = this.subFoodClass('TX');
    //FOOD-CLASS-S
    this.unsubFoodClassS = this.subFoodClass('foodClassS');
    //FOOD-CLASS GR
    this.unsubFoodClassGR = this.subFoodClass('foodClassGR');
    //FOOD-CLASS PITA
    this.unsubFoodClassPITA = this.subFoodClass('foodClassPITA');
    //FOOD-CLASS GY(JUST GYROS)
    this.unsubFoodClassGY = this.subFoodClass('foodClassGY');
    console.log(this.foodClassGY);
  }

  subFoodType(foodType: string, array: any[]) {
    return onSnapshot(this.getFoodTypeRef(foodType), (list) => {
      list.forEach((dish) => {
        array.push(this.setDishObject(dish.data(), dish.id));
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
        } else if (foodClass === 'foodClassGR') {
          this.foodClassGR.push(this.setFoodClassObject(topping.data()));
        } else if (foodClass === 'foodClassPITA') {
          this.foodClassPITA.push(this.setFoodClassObject(topping.data()));
        } else if (foodClass === 'foodClassGY') {
          this.foodClassGY.push(this.setFoodClassObject(topping.data()));
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
    this.unsubChildren();
    this.unsubSchnitzel();
    this.unsubGrilledDishes();
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
      background: obj.background || '',
    };
  }
}
