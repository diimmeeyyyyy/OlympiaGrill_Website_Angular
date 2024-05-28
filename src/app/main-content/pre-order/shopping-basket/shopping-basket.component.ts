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
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [CommonModule, ShoppingBasketItemComponent],
  templateUrl: './shopping-basket.component.html',
  styleUrl: './shopping-basket.component.scss',
})
export class ShoppingBasketComponent {
  constructor(
    private preOrderService: PreorderdataService,
    private cdref: ChangeDetectorRef
  ) {}

  @ViewChild(ShoppingBasketItemComponent, { read: ElementRef })
  item!: ElementRef;
  @Output() close = new EventEmitter<void>();
  closeShoppingBasket() {
    this.close.emit();
  }

  @ViewChild('Shopping_Basket') shoppingBasket!: ElementRef;
  @Output() shoppingBasketReady = new EventEmitter<ElementRef>();

  ngAfterViewInit() {
    this.shoppingBasketReady.emit(this.shoppingBasket);
    this.cdref.detectChanges();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  getShoppingBasket() {
    return this.preOrderService.shoppingBasket;
  }

  getTotalPrice() {
    let totalPrice = this.preOrderService.shoppingBasket.reduce(
      (total, item) => total + item.amount * item.price,
      0
    );
    return totalPrice.toFixed(2).replace('.', ',');
  }

  onChangedItemPrice(updatedData: { amount: number; index: number }) {
    const index = this.preOrderService.shoppingBasket.findIndex(
      (item) => item.id === updatedData.index
    );
    if (index !== -1) {
      this.preOrderService.shoppingBasket[index].amount = updatedData.amount;
    }
    console.log(this.preOrderService.shoppingBasket);
    this.getTotalPrice();
  }

  onRemoveItem(index: number) {
    this.preOrderService.shoppingBasket.splice(index, 1);
    this.getTotalPrice();
    if (this.preOrderService.shoppingBasket.length === 0) {
      this.preOrderService.totalItemAmount = 0;
      this.closeShoppingBasket();
    }
    this.preOrderService.totalItemAmount--;
    this.getBorderRadius();
    // IDs neu zuweisen
    this.preOrderService.shoppingBasket.forEach((item, index) => {
      item.id = index;
    });
  }

  /* getBorderRadius(): string {
    const height = this.item ? this.item.nativeElement.offsetHeight : 0;
    return height < 72 ? '31px' : '38px';
  } */

  getBorderRadius(): string {
    if (window.innerWidth <= 1024) {
      const height = this.item ? this.item.nativeElement.offsetHeight : 0;
      return height < 72 ? '31px' : '38px';
    } else {
      return '0';
    }
  }
}
