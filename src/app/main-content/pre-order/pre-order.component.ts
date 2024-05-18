import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FoodMenuNavComponent } from './food-menu-nav/food-menu-nav.component';
import { PreorderdataService } from '../../shared/firebase-services/preorderdata.service';
import { FoodContainerComponent } from './food-container/food-container.component';
import { Dish } from '../../interfaces/dish.interface';
import { FoodContainerChildComponent } from './food-container/food-container-child/food-container-child.component';

@Component({
  selector: 'app-pre-order',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FoodMenuNavComponent,
    FoodContainerComponent,
    FoodContainerChildComponent,
  ],
  templateUrl: './pre-order.component.html',
  styleUrl: './pre-order.component.scss',
})
export class PreOrderComponent {
  preorderdata = inject(PreorderdataService);
  showChildContainer = false;
  selectedFoodType: string = '';

  foodList: Dish[] = [];

  constructor(private preOrderService: PreorderdataService) {}

  renderFoodTypeSection(name: string) {
    this.selectedFoodType = name;
    console.log(this.selectedFoodType);
    this.getFoodTypeList();
  }

  getFoodTypeList() {
    if (this.selectedFoodType === 'Salate') {
      return this.preOrderService.salads;
    } else if (this.selectedFoodType === 'Beilagen') {
      return this.preOrderService.sides;
    } else if (this.selectedFoodType === 'Vorspeisen') {
      return this.preOrderService.appetizers;
    } else if (this.selectedFoodType === 'Schnelle Gerichte') {
      return this.preOrderService.fastDishes;
    } else if (this.selectedFoodType === 'Kinder') {
      return this.preOrderService.kids;
    } else {
      return this.preOrderService.popularDishes;
    }
  }


}
