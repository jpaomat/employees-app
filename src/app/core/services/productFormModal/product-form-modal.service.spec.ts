import { TestBed } from '@angular/core/testing';

import { ProductFormModalService } from './product-form-modal.service';

describe('ProductFormModalService', () => {
  let service: ProductFormModalService;
  let dataTest = {
    activateModal: true,
    activateInput: false,
    textsProductForm: 'data to show on product form layout',
    dataProductForm: 'data product form'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should emits an event with the data provide by the parent component', () => {
    service.showModal(dataTest);
    expect(service).toBeTruthy();
  })

  it('Should get data emit by the parent component', () => {
    service.getModal().subscribe(data => {
      if (data) {
        expect(data).toEqual(dataTest);
      }
    });
  })

  it('Should clear data emit', () => {
    service.clearModal();
    expect(service).toBeTruthy();
  })
});
