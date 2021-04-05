import { Component, OnInit } from '@angular/core';
import { RouterWorflowService } from 'src/app/core/services/router-workflow/router-worflow.service';

import EMPLOYEES from 'src/app/config/dataTest/employees.json';
import { DataManagementService } from 'src/app/core/services/dataManagement/data-management.service';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public filterEmployee: string;
  public dataView = {
    parametricTexts: {
      header: [],
      table: []
    }
  };
  public employeesRegistered;

  constructor(
    private workflowSrv: RouterWorflowService,
    private dataManagementSrv: DataManagementService,
    private productFormService: ProductFormModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataManagementSrv.organizeDataView('texts', EMPLOYEES.dataTable, this.dataView.parametricTexts);
    this.workflowSrv.getEmployes().subscribe((employees) => {
      this.employeesRegistered = employees;
    });
  }

  public onInputHandler(event) {
    this.filterEmployee = event.target.value;
  }

  public showForm(state) {
    this.productFormService.showModal({
      activateModal: state,
      activateInput: false
    });
  }

  public onAction(action, data): void {
    if (action === "edit") {
      this.productFormService.showModal({
        activateModal: true,
        activateInput: false,
        dataForm: data
      });
    } else {
      this.workflowSrv.deleteEmployee(data.idEmployee).subscribe((response) => {
        console.log(response);
        this.router.navigate(['/f']);
      });
    }
  }

}
