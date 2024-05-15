import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PreOrderComponent } from './pre-order/pre-order.component';
import { FoodMenuNavComponent } from './pre-order/food-menu-nav/food-menu-nav.component';
import { FoodContainerComponent } from './pre-order/food-container/food-container.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    PreOrderComponent,
    FoodMenuNavComponent,
    FoodContainerComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
