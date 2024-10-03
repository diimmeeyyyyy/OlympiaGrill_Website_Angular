import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Output,
  ViewChild,
  EventEmitter,
  inject,
} from '@angular/core';
import { PreorderdataService } from '../../shared/firebase-services/pre-order-data/preorderdata.service';
import { ShoppingBasketItemComponent } from './shopping-basket-item/shopping-basket-item.component';
import { ChangeDetectorRef } from '@angular/core';
import { ShoppingbasketService } from '../../shared/firebase-services/basket/shoppingbasket.service';
import { Order } from '../../shared/interfaces/order.interface';
import { ShoppingBasketItem } from '../../shared/interfaces/shopping-basket-item.interface';
import { UserService } from '../../shared/firebase-services/user/user.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface PickUpTime {
  option: string;
  value: number;
}

@Component({
  selector: 'app-shopping-basket',
  standalone: true,
  imports: [
    CommonModule,
    ShoppingBasketItemComponent,
    CalendarModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './shopping-basket.component.html',
  styleUrl: './shopping-basket.component.scss',
})
export class ShoppingBasketComponent {
  basketService = inject(ShoppingbasketService);
  userService = inject(UserService);

  constructor(private cdref: ChangeDetectorRef) {}
  pickUpOptions: PickUpTime[] | undefined;
  selectedTime!: PickUpTime;
  /* time!: Date;
  pickupTime!: string; */
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
    this.initPickUpOptions();
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

  initPickUpOptions() {
    this.pickUpOptions = [
      { option: 'sofort', value: 0 },
      { option: 'in 20 Minuten', value: 20 },
      { option: 'in 30 Minuten', value: 30 },
    ];
    this.selectedTime = { option: 'sofort', value: 0 };
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

  async sendOrderRequest() {
    let shoppingBasket = this.createShoppingBasket();
    let order: Order = this.createOrder(shoppingBasket);
    await this.requestOrder(order);
    this.emptyBasket();
    this.showNotification();
  }

  createShoppingBasket() {
    //REMOVE UNDEFINED-FIELD IN BASKET-OBJECTS, BC OTHERWISE ERROR
    return this.basketService.shoppingBasket.map((item) =>
      this.createShoppingBasketItem(item)
    );
  }

  createShoppingBasketItem(
    data: Partial<ShoppingBasketItem>
  ): ShoppingBasketItem {
    return {
      id: data.id ?? 0,
      title: data.title ?? '',
      price: data.price ?? 0,
      amount: data.amount ?? 1,
      foodClass: data.foodClass ?? '',
      toppings: data.toppings ?? [],
      salad: data.salad ?? '',
      bifteki: data.bifteki ?? '',
      gyrosSpecial: data.gyrosSpecial ?? '',
      sides: data.sides ?? '',
    };
  }

  createOrder(shoppingBasket: ShoppingBasketItem[]) {
    return {
      timestamp: new Date().getTime(),
      customer: this.userService.activeUser?.name || 'guest',
      customerEmail: this.userService.activeUser?.email || 'guest@gmx.de',
      order: shoppingBasket,
      status: 'open',
    };
  }

  showNotification() {
    this.basketService.orderWasRequested = true;
    this.basketService.visible = true;
  }

  async requestOrder(order: Order) {
    try {
      await this.basketService.requestOrder(order);
    } catch (error) {
      console.error('Fehler beim Anfordern der Bestellung', error);
    }
  }

  emptyBasket() {
    this.basketService.shoppingBasket.length = 0;
    this.basketService.totalItemAmount = 0;
    this.closeShoppingBasket();
  }
}
