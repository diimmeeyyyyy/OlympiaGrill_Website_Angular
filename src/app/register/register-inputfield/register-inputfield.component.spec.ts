import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInputfieldComponent } from './register-inputfield.component';

describe('RegisterInputfieldComponent', () => {
  let component: RegisterInputfieldComponent;
  let fixture: ComponentFixture<RegisterInputfieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInputfieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterInputfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
