import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { PreorderdataService } from '../../../shared/firebase-services/preorderdata.service';
import { ShoppingBasketItemComponent } from './shopping-basket-item/shopping-basket-item.component';

@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [CommonModule, ShoppingBasketItemComponent],
  templateUrl: './shopping-basket.component.html',
  styleUrl: './shopping-basket.component.scss',
})
export class ShoppingBasketComponent {
  constructor(private preOrderService: PreorderdataService) {}

  @Output() close = new EventEmitter<void>();
  closeShoppingBasket() {
    this.close.emit();
  }

  getShoppingBasket() {
    return this.preOrderService.shoppingBasket;
  }

  /* 
  @ViewChild('Shopping_Basket') shoppingBasket!: ElementRef;
  @Output() shoppingBasketReady = new EventEmitter<ElementRef>();



  ngAfterViewInit() {
    this.shoppingBasketReady.emit(this.shoppingBasket);
  } */
}
