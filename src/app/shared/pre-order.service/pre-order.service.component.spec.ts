import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderServiceComponent } from './pre-order.service.component';

describe('PreOrderServiceComponent', () => {
  let component: PreOrderServiceComponent;
  let fixture: ComponentFixture<PreOrderServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreOrderServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreOrderServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
