import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { PreOrderComponent } from './pre-order/pre-order.component';
import { ImprintComponent } from './shared/imprint/imprint.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'preOrder', component: PreOrderComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'myOrders', component: MyOrdersComponent },
];
