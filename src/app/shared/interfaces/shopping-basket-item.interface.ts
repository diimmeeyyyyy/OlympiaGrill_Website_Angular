export interface ShoppingBasketItem {
  id: number;
  title: string;
  price: number;
  amount: number;
  foodClass: string;
  toppings?: string[];
  salad?: string;
  bifteki?: string;
  gyrosSpecial?: string;
  sides?: string;
}
