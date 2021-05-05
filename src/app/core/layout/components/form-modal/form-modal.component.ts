import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';

import { Router } from '@angular/router';
import FORM from 'src/app/config/dataTest/form.json';
import { DataManagementService } from 'src/app/core/services/dataManagement/data-management.service';
import { RouterWorflowService } from 'src/app/core/services/router-workflow/router-worflow.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {

  public showModal: boolean;
  public activateInput: boolean;
  public sectionInput: boolean;
  public registerForm: FormGroup;
  public activateMessages: string = '';
  public title: string;
  public header: string;
  public click: boolean = true;
  public editData: any = '';
  public employeesRegistered: any;
  public dataView = {
    parametricTexts: {
      title: [],
      header: [],
      placeholders: [],
      buttons: []
    }
  }

  constructor(
    private productFormService: ProductFormModalService,
    private formBuilder: FormBuilder,
    public router: Router,
    private dataManagementService: DataManagementService,
    private workflowSrv: RouterWorflowService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeData();
  }

  private initializeData(): void {
    this.dataManagementService.organizeDataView('texts', FORM.form, this.dataView.parametricTexts);
    this.productFormService.getModal().subscribe(response => {
      console.log('DATA RECIBIDA EN EL FORMULARIO', response);
      if (response) {
        this.showModal = (response.activateModal) ? true : false;
        this.activateInput = (response.activateInput) ? true : false;
        this.getTexts();
        /* istanbul ignore else*/
        if (this.showModal) {
          this.employeesRegistered = response.dataEmployees;
          if (response.dataForm) {
            this.editData = response.dataForm.id;
            this.preloadData(response.dataForm);
            return;
          }
        }
      }
    });
    // this.workflowSrv.getEmployes().subscribe((employees) => {
    //   console.log('employees desde form', employees);
    //   this.employeesRegistered = employees.data;
    // });
  }

  private initializeForm(): void {
    this.sectionInput = false;
    this.registerForm = this.formBuilder.group({
      idEmployee: ['', Validators.required],
      fullname: ['', Validators.required],
      occupation: ['', Validators.required],
      idBoss: ['', Validators.required]
    });
  }

  public preloadData(data): void {
    this.registerForm.controls['idEmployee'].setValue(data.idEmployee);
    this.registerForm.controls['fullname'].setValue(data.fullname);
    this.registerForm.controls['occupation'].setValue(data.occupation);
    this.registerForm.controls['idBoss'].setValue(data.idBoss);
  }

  public getTexts(): void {
    let index = (this.activateInput) ? 1 : 0;
    this.title = this.dataView.parametricTexts.title[index].text;
    this.header = this.dataView.parametricTexts.header[index].text;
  }

  public onClick(state): void {
    this.sectionInput = true;
    this.activateInput = (state == 'add') ? false : true;
    this.getTexts();
    if (this.activateInput) {
      this.router.navigate(['/employees']);
      this.onClose(false);
    }
  }

  @HostListener('window:click', ['$event'])
  onClickHandler(event: any): void {
    if ((event.target as HTMLElement).id !== "user_exist") {
      this.activateMessages = '';
      this.click = true;
    }
  }

  public validateForm() {
    return (this.registerForm.valid && !this.activateMessages ) ? false : true;
  }

  public onClose(state): void {
    this.productFormService.showModal({
      activateModal: state,
      activateInput: false
    });
    this.initializeForm();
    this.router.navigate(['/employees']); 
  }

  public onCall(): void {
    this.click = false;
    let valueForm = this.registerForm.value;
    console.log('Data enviada del formulario', this.editData, valueForm);
    if (this.editData) {
      this.workflowSrv.editEmployee(this.editData, valueForm).subscribe((response) => {
        console.log(response);
        this.initializeForm();
        this.onClose(false);
        this.router.navigate(['/f']);
      });
    } else {
      this.workflowSrv.getEmployesById(valueForm.idEmployee).subscribe((response) => {
        if (response.data[0]) {
          this.activateMessages = `El usuario con número de empleado ${response.data[0].idEmployee}, ya existe`;
        } else {
          this.workflowSrv.createEmployee(valueForm).subscribe((response) => {
            console.log(response);
            this.initializeForm();
            this.onClose(false);
            this.router.navigate(['/f']);
          });
        }
      });
    }
  }
}
