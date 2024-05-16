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
  @Input() index!: number;

  constructor(private preOrderService: PreorderdataService) {}

  getFoodClassContent(): FoodClass[] | undefined {
    if (this.dish.foodClass === 'TX') {
      return this.preOrderService.foodClassTX;
    } else if (this.dish.foodClass === 'S') {
      return this.preOrderService.foodClassS;
    } else if (this.dish.foodClass === 'GR') {
      return this.preOrderService.foodClassGR;
    } else {
      return undefined;
    }
  }

  getFoodClassBackground() {
    if (this.dish.foodClass === 'TX') {
      return '/assets/img/backgroundTX.jpg';
    } else {
      return '/assets/img/background07.jpg';
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
