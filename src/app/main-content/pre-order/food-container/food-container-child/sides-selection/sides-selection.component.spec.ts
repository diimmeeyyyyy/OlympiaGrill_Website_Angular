import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesSelectionComponent } from './sides-selection.component';

describe('SidesSelectionComponent', () => {
  let component: SidesSelectionComponent;
  let fixture: ComponentFixture<SidesSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidesSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidesSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
