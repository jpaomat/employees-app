import { Component, OnInit } from '@angular/core';
import { RouterWorflowService } from 'src/app/core/services/router-workflow/router-worflow.service';

import EMPLOYEES from 'src/app/config/dataTest/employees.json';
import { DataManagementService } from 'src/app/core/services/dataManagement/data-management.service';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  private employee = {
    idEmployee: "1835",
    fullname: "Jose Cardona",
    occupation: "ingeniero",
    idBoss: "1234"
  };
  public filterEmployee: string;
  public dataView = {
    parametricTexts: {
      header: [],
      table: []
    }
  };
  public employeesRegistered;
  public fieldsTable = ['ID empleado', 'Nombre', 'Cargo', 'Jefe inmediato']

  constructor(
    private workflowSrv: RouterWorflowService,
    private dataManagementSrv: DataManagementService,
    private productFormService: ProductFormModalService
  ) { }

  ngOnInit(): void {
    this.dataManagementSrv.organizeDataView('texts', EMPLOYEES.dataTable, this.dataView.parametricTexts);
    console.log('TEXTOS', this.dataView.parametricTexts)
    this.workflowSrv.getEmployes().subscribe((employees) => {
      this.employeesRegistered = employees;
      console.log('ENPLOYEES', employees);
    });
    // this.workflowSrv.getEmployes().subscribe((employee) => {
    //   console.log('ENPLOYEE', employee);
    // });
    // this.workflowSrv.createEmployee(this.employee).subscribe((response) => {
    //   console.log('CREATE ENPLOYEE', response);
    // });
    // this.workflowSrv.editEmployee('3', this.employee).subscribe((response) => {
    //   console.log('CREATE ENPLOYEE', response);
    // });
    // this.workflowSrv.deleteEmployee('1840').subscribe((response) => {
    //   console.log('CREATE ENPLOYEE', response);
    // });

  }

  public onInputHandler(event) {
    this.filterEmployee = event.target.value;
  }

  public showForm(state) {
    this.productFormService.showModal({
      activateModal: state,
      activateInput: true
    });
  }

}
