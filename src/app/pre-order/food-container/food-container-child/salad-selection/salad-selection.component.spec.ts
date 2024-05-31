import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladSelectionComponent } from './salad-selection.component';

describe('SaladSelectionComponent', () => {
  let component: SaladSelectionComponent;
  let fixture: ComponentFixture<SaladSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaladSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaladSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
