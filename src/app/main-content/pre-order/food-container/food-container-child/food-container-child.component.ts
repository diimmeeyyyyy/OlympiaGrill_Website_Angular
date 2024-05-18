import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreorderdataService } from '../../../../shared/firebase-services/preorderdata.service';
import { FoodClass } from '../../../../interfaces/food-class.interface';
import { SaladSelectionComponent } from './salad-selection/salad-selection.component';

@Component({
  selector: 'app-food-container-child',
  standalone: true,
  imports: [CommonModule, SaladSelectionComponent],
  templateUrl: './food-container-child.component.html',
  styleUrl: './food-container-child.component.scss',
})
export class FoodContainerChildComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;

  constructor(private preOrderService: PreorderdataService) {}

  getFoodClassContent(): FoodClass[] | undefined {
    if (this.dish.foodClass === 'TX') {
      return this.preOrderService.foodClassTX;
    } else if (this.dish.foodClass === 'S') {
      return this.preOrderService.foodClassS;
    } else if (this.dish.foodClass === 'GR' || this.dish.foodClass === 'GP') {
      return this.preOrderService.foodClassGR;
    } else if (this.dish.foodClass === 'PITA') {
      return this.preOrderService.foodClassPITA;
    } else if (this.dish.foodClass === 'GY') {
      return this.preOrderService.foodClassGY;
    } else {
      return undefined;
    }
  }

  getFoodClassBackground() {
    if (this.dish.foodClass === 'TX') {
      return 'backgroundFoodClassTX';
    } else if (this.dish.foodClass === 'GR') {
      return 'backgroundFoodClassGR';
    } else if (this.dish.foodClass === 'PITA') {
      return 'backgroundFoodClassPITA';
    } else {
      return 'backgroundFoodClassGR';
    }
  }

  getToppingPrice(price: number | undefined) {
    return price == 0 ? '' : '+ ' + price?.toFixed(2).replace('.', ',') + ' €';
  }

  @Output() close = new EventEmitter<void>();
  closeChildContainer() {
    this.close.emit();
  }
}
