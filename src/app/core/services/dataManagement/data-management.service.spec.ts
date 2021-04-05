import { TestBed } from '@angular/core/testing';

import { DataManagementService } from './data-management.service';

describe('DataManagementService', () => {
  let service: DataManagementService;
  let dataView: any = {
    parametricTexts: {
      header: '',
      table: ''
    },
    kardex: [
      {
        "header": [
          {
            "H001": "INVENTARIO DE PRODUCTOS"
          }
        ]
      },
      {
        "table": [
          {
            "T001": "nameColumns"
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should organized data, it converts an object to array', () => {
    service.organizeDataView('texts', dataView.kardex, dataView.parametricTexts);
    service.organizeDataView('other', dataView.kardex, dataView.parametricTexts);
    expect(service).toBeTruthy();
  });
});
