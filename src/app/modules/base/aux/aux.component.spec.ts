import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxComponent } from './aux.component';

describe('AuxComponent', () => {
  let component: AuxComponent;
  let fixture: ComponentFixture<AuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
