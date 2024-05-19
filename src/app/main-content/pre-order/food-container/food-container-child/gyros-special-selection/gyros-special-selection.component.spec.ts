import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GyrosSpecialSelectionComponent } from './gyros-special-selection.component';

describe('GyrosSpecialSelectionComponent', () => {
  let component: GyrosSpecialSelectionComponent;
  let fixture: ComponentFixture<GyrosSpecialSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GyrosSpecialSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GyrosSpecialSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
