import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodContainerChildComponent } from './food-container-child.component';

describe('FoodContainerChildComponent', () => {
  let component: FoodContainerChildComponent;
  let fixture: ComponentFixture<FoodContainerChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodContainerChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodContainerChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
