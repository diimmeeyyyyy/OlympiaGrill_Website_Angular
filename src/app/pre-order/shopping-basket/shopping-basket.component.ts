import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  inject,
} from '@angular/core';
import { PreorderdataService } from '../../shared/firebase-services/preorderdata.service';
import { ShoppingBasketItemComponent } from './shopping-basket-item/shopping-basket-item.component';
import { ChangeDetectorRef } from '@angular/core';
import { ShoppingbasketService } from '../../shared/firebase-services/shoppingbasket.service';
import { OrderRequest } from '../../interfaces/orderRequest.interface';

@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [CommonModule, ShoppingBasketItemComponent],
  templateUrl: './shopping-basket.component.html',
  styleUrl: './shopping-basket.component.scss',
})
export class ShoppingBasketComponent {
  basketService = inject(ShoppingbasketService);

  constructor(
    /* private preOrderService: PreorderdataService, */
    private cdref: ChangeDetectorRef
  ) {}

  pickupTime!: string;
  private timerId: any;
  @ViewChild(ShoppingBasketItemComponent, { read: ElementRef })
  item!: ElementRef;
  @Output() close = new EventEmitter<void>();
  closeShoppingBasket() {
    this.close.emit();
  }
  @ViewChild('Arrow_Top') arrowTop!: ElementRef;
  @ViewChild('Arrow_Bottom') arrowBottom!: ElementRef;
  @ViewChild('Order_Overview') orderOverview!: ElementRef;
  @ViewChild('Shopping_Basket') shoppingBasket!: ElementRef;
  @Output() shoppingBasketReady = new EventEmitter<ElementRef>();

  ngOnInit() {
    this.updatePickUpTime();
    const secondsUntilNextMinute = 60 - new Date().getSeconds();
    setTimeout(() => {
      this.updatePickUpTime();
      this.timerId = setInterval(() => this.updatePickUpTime(), 60000);
    }, secondsUntilNextMinute * 1000);
  }

  ngAfterViewInit() {
    this.orderOverview.nativeElement.addEventListener('scroll', () => {
      this.appearBottomArrow();
    });
    this.appearBottomArrow();
    this.shoppingBasketReady.emit(this.shoppingBasket);
    this.cdref.detectChanges();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  getShoppingBasket() {
    return this.basketService.shoppingBasket;
  }

  getTotalPrice() {
    let totalPrice = this.basketService.shoppingBasket.reduce(
      (total, item) => total + item.amount * item.price,
      0
    );
    return totalPrice.toFixed(2).replace('.', ',');
  }

  onChangedItemPrice(updatedData: { amount: number; index: number }) {
    const index = this.basketService.shoppingBasket.findIndex(
      (item) => item.id === updatedData.index
    );
    if (index !== -1) {
      this.basketService.shoppingBasket[index].amount = updatedData.amount;
    }
    this.getTotalPrice();
  }

  onRemoveItem(index: number) {
    this.basketService.shoppingBasket.splice(index, 1);
    this.getTotalPrice();
    if (this.basketIsEmpty() && this.screenIsSmall()) {
      this.basketService.totalItemAmount = 0;
      this.basketService.nextId = 0;
      this.closeShoppingBasket();
    } else {
      this.basketService.totalItemAmount--;
    }
    this.getBorderRadius();
    this.assignNewId();
    setTimeout(() => {
      this.appearBottomArrow();
    }, 0);
  }

  assignNewId() {
    this.basketService.shoppingBasket.forEach((item, index) => {
      item.id = index;
    });
  }

  basketIsEmpty() {
    return this.basketService.shoppingBasket.length === 0;
  }

  screenIsSmall() {
    return window.innerWidth <= 1024;
  }

  getBorderRadius(): string {
    if (window.innerWidth <= 1024) {
      const height = this.item ? this.item.nativeElement.offsetHeight : 0;
      return height < 72 ? '31px' : '38px';
    } else {
      return '0';
    }
  }

  appearBottomArrow() {
    if (
      this.orderOverview.nativeElement.scrollHeight -
        this.orderOverview.nativeElement.scrollTop -
        this.orderOverview.nativeElement.clientHeight >
      50
    ) {
      this.arrowBottom.nativeElement.classList.remove('d-none');
    } else {
      this.arrowBottom.nativeElement.classList.add('d-none');
    }
  }

  checkoutConditionsAreMet() {
    return !this.minOrderValue() && !this.basketIsEmpty();
  }

  minOrderValue() {
    let total = this.basketService.shoppingBasket.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
    return total >= 20;
  }

  updatePickUpTime() {
    const date = new Date();
    date.setSeconds(0);
    date.setMinutes(date.getMinutes() + 15);
    this.pickupTime = date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  sendOrderRequest() {
    let order:OrderRequest ={
      client:'DIMI TEST',
      order: this.basketService.shoppingBasket
    }
    debugger;
    console.log(this.basketService.shoppingBasket);
    //todo Bestellung in Firebase hinzufügen
    this.basketService.requestOrder(order);

    /* todo basket leeren */
    this.basketService.shoppingBasket.length = 0;
    this.basketService.totalItemAmount = 0;
    this.closeShoppingBasket();

    /* todo Benachrichtigung, dass die Bestellanfrage bei uns eingeangen ist */
  }
}
