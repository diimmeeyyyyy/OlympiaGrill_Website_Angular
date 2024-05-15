import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodMenuNavComponent } from './food-menu-nav.component';

describe('FoodMenuNavComponent', () => {
  let component: FoodMenuNavComponent;
  let fixture: ComponentFixture<FoodMenuNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodMenuNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodMenuNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
