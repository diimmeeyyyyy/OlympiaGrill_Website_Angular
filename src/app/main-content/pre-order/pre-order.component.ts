import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FoodMenuNavComponent } from './food-menu-nav/food-menu-nav.component';
import { PreorderdataService } from '../../shared/firebase-services/preorderdata.service';
import { FoodContainerComponent } from './food-container/food-container.component';

@Component({
  selector: 'app-pre-order',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FoodMenuNavComponent,
    FoodContainerComponent,
  ],
  templateUrl: './pre-order.component.html',
  styleUrl: './pre-order.component.scss',
})
export class PreOrderComponent {
  preorderdata = inject(PreorderdataService);

  selectedFoodType: string = '';

  nameLog(name: string) {
    console.log(name);
    this.selectedFoodType = name;
    alert(this.selectedFoodType);
    //Anstatt nameLog müsste dann hier die renderSection() sein oder so
  }

  getFoodTypeList() {}
}
