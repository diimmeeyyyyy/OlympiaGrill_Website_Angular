import { ShoppingBasketItem } from './shopping-basket-item.interface';

export interface OrderRequest {
  timestamp: number;
  customer: string;
  customerEmail: string;
  order: ShoppingBasketItem[];
}
