import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiftekiSelectionComponent } from './bifteki-selection.component';

describe('BiftekiSelectionComponent', () => {
  let component: BiftekiSelectionComponent;
  let fixture: ComponentFixture<BiftekiSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiftekiSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiftekiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
