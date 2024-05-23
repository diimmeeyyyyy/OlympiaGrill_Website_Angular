import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketItemComponent } from './shopping-basket-item.component';

describe('ShoppingBasketItemComponent', () => {
  let component: ShoppingBasketItemComponent;
  let fixture: ComponentFixture<ShoppingBasketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingBasketItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
