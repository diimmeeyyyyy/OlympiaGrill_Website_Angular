import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from '@angular/fire/firestore';
import { Dish } from '../../interfaces/dish.interface';
import { FoodClass } from '../../interfaces/food-class.interface';
import { ShoppingBasketItem } from '../../interfaces/shopping-basket-item.interface';

@Injectable({
  providedIn: 'root',
})
export class PreorderdataService {
  firestore: Firestore = inject(Firestore);

  shoppingBasket: ShoppingBasketItem[] = [];
  totalItemAmount = this.shoppingBasket.reduce(
    (total, item) => total + item.amount,
    0
  );
  nextId: number = 0;

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
  unsubFoodClassPITAVEG;
  unsubFoodClassBUR;
  unsubFoodClassK;

  foodClassTX: FoodClass[] = [];
  foodClassS: FoodClass[] = [];
  foodClassGR: FoodClass[] = [];
  foodClassPITA: FoodClass[] = [];
  foodClassGY: FoodClass[] = [];
  foodClassPITAVEG: FoodClass[] = [];
  foodClassBUR: FoodClass[] = [];
  foodClassK: FoodClass[] = [];

  constructor() {
    this.unsubPopularDishes = this.subFoodType(
      'popularDishes',
      this.popularDishes
    );
    this.unsubSalads = this.subFoodType('salads', this.salads);
    this.unsubSides = this.subFoodType('sides', this.sides);
    this.unsubAppetizers = this.subFoodType('appetizers', this.appetizers);
    this.unsubFastDishes = this.subFoodType('fastDishes', this.fastDishes);
    this.unsubChildren = this.subFoodType('kinder', this.kids);
    this.unsubSchnitzel = this.subFoodType('schnitzel', this.schnitzel);
    this.unsubGrilledDishes = this.subFoodType('grill', this.grilledDishes);
    this.unsubGyrosDishes = this.subFoodType('gyrosDishes', this.gyrosDishes);
    this.unsubPita = this.subFoodType('pita', this.pita);
    //FOOD-CLASSES
    this.unsubFoodClassTX = this.subFoodClass('TX');
    this.unsubFoodClassS = this.subFoodClass('foodClassS');
    this.unsubFoodClassGR = this.subFoodClass('foodClassGR');
    this.unsubFoodClassPITA = this.subFoodClass('foodClassPITA');
    this.unsubFoodClassGY = this.subFoodClass('foodClassGY');
    this.unsubFoodClassPITAVEG = this.subFoodClass('foodClassPITAVEG');
    this.unsubFoodClassBUR = this.subFoodClass('foodClassBUR');
    this.unsubFoodClassK = this.subFoodClass('foodClassK');
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
        } else if (foodClass === 'foodClassPITAVEG') {
          this.foodClassPITAVEG.push(this.setFoodClassObject(topping.data()));
        } else if (foodClass === 'foodClassBUR') {
          this.foodClassBUR.push(this.setFoodClassObject(topping.data()));
        } else if (foodClass === 'foodClassK') {
          this.foodClassK.push(this.setFoodClassObject(topping.data()));
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
    this.unsubFoodClassTX();
    this.unsubFoodClassS();
    this.unsubFoodClassGR();
    this.unsubFoodClassPITA();
    this.unsubFoodClassGY();
    this.unsubFoodClassPITAVEG();
    this.unsubFoodClassBUR();
    this.unsubFoodClassK();
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
