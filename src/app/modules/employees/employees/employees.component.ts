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
    this.workflowSrv.getEmployes().subscribe((employees) => {
      this.employeesRegistered = employees;
      console.log('ENPLOYEES', employees);
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
    console.log(action, data);
    if (action === "edit") {
      this.productFormService.showModal({
        activateModal: true,
        activateInput: false,
        dataForm: data
      });
      // this.workflowSrv.getEmployesById(data.idEmployee).subscribe((employee) => {
      //   console.log('GET ENPLOYEE', employee);
      // });
    } else {
      this.workflowSrv.deleteEmployee(data.idEmployee).subscribe((response) => {
        console.log('DELETE ENPLOYEE', response);
      });
    }
  }

}
