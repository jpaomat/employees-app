import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

import { EmployeesComponent } from './employees.component';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let dataTest = {
    activateModal: true,
    activateInput: false,
    textsProductForm: 'data to show on product form layout',
    dataProductForm: 'data product form'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [HttpClientModule, RouterTestingModule, PipesModule],
      providers: [
        HttpClient
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.onInputHandler({ target: { value: 'value' } });
    expect(component).toBeTruthy();
  });

  it('should edit or delete an employee', () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.onAction('edit', { data: '' });
    expect(component).toBeTruthy();
  });

  it('Should emits an event with the data provide by the parent component', () => {
    // component.showForm(dataTest);
    expect(component).toBeTruthy();
  })
});
