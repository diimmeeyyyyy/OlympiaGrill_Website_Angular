import { Order } from './order.interface';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  orders: string[];
}
