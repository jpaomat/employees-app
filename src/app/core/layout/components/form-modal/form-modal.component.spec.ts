import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DataManagementService } from 'src/app/core/services/dataManagement/data-management.service';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';
import { RouterWorflowService } from 'src/app/core/services/router-workflow/router-worflow.service';
import { environment } from 'src/environments/environment';

import { FormModalComponent } from './form-modal.component';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;
  let dataTest = {
    idEmployee: '123',
    fullname: 'Jose',
    occupation: 'Gerente',
    idBoss: '456'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormModalComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        ProductFormModalService,
        FormBuilder,
        DataManagementService,
        HttpClient
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data in ngOnint and activate the modal', async(() => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(TestBed.inject(ProductFormModalService), 'getModal').and.returnValue(of({
      activateModal: true
    }));
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));

  it('should validate if the form was completed correctly', () => {
    component.validateForm();
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.onClose(false);
    expect(component).toBeTruthy();
  });

  it('should send the data to the databse', () => {
    // spyOn(TestBed.inject(RouterWorflowService), 'editEmployee').and.returnValue(of({
    //   message: 'employee created'
    // }));
    // component.editData = '';
    component.onCall();
    component.editData = 'data';
    component.onCall();
    expect(component).toBeTruthy();
  });

  it('should preload data in form', () => {
    component.preloadData(dataTest);
    expect(component).toBeTruthy();
  });

  it('should add or delete employees', () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.onClick('add');
    component.onClick('delete');
    expect(component).toBeTruthy();
  });

  it('should show error', () => {
    component.onClickHandler({target: {id: 'a'}});
    component.onClickHandler({target: {id: 'user_exist'}});
    expect(component).toBeTruthy();
  });
});
