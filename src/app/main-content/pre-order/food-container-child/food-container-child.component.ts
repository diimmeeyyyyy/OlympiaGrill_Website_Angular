import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PreorderdataService } from '../../../shared/firebase-services/preorderdata.service';
import { FoodClass } from '../../../interfaces/food-class.interface';

@Component({
  selector: 'app-food-container-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-container-child.component.html',
  styleUrl: './food-container-child.component.scss',
})
export class FoodContainerChildComponent {
  @Input() dish: any;

  constructor(private preOrderService: PreorderdataService) {}

  getFoodClassContent(): FoodClass[] | undefined {
    if (this.dish.foodClass === 'TX') {
      return this.preOrderService.foodClassTX;
    } else {
      return undefined;
    }
  }

  getToppingPrice(price: number | undefined) {
    return price == 0 ? '' : '+ ' + price?.toFixed(2).replace('.', ',') + ' €';
  }
}
