import { ShoppingBasketItem } from './shopping-basket-item.interface';

export interface Order {
  id?: string;
  timestamp: number;
  pickUpTime:number;
  customer: string;
  customerEmail: string;
  order: ShoppingBasketItem[];
  status: string;
}
