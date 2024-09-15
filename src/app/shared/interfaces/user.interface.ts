import { OrderRequest } from './orderRequest.interface';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  orders: OrderRequest[];
}
