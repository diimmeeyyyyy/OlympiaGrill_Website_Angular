import { ShoppingBasketItem } from './shopping-basket-item.interface';

export interface OrderRequest {
  timestamp: number;
  customer: string;
  order: ShoppingBasketItem[];
}
