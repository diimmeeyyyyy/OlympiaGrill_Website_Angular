import { OrderRequest } from './orderRequest.interface';

export interface User {
  name: string;
  email: string;
  password: string;
  orders: OrderRequest[];
}
