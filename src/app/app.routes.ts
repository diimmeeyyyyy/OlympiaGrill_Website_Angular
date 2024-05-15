import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { PreOrderComponent } from './main-content/pre-order/pre-order.component';
import { ShoppingBasketComponent } from './main-content/shopping-basket/shopping-basket.component';
import { MainContentComponent } from './main-content/main-content.component';

export const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'main-content', component: MainContentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'preOrder', component: PreOrderComponent },
  { path: 'shoppingBasket', component: ShoppingBasketComponent },
];
