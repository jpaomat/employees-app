import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';

import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/core/services/dataManagement/data-management.service';
import { RouterWorflowService } from 'src/app/core/services/router-workflow/router-worflow.service';

import FORM from 'src/app/config/dataTest/form.json';
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
  public title: string;
  public header: string;
  private editData: any = '';
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
      if (response) {
        this.showModal = (response.activateModal) ? true : false;
        this.activateInput = (response.activateInput) ? true : false;
        this.getTexts();
        /* istanbul ignore else*/
        if (this.showModal) {
          if (response.dataForm) {
            this.editData = response.dataForm.id;
            this.preloadData(response.dataForm);
          }
          return;
        }
      }
    });
    console.log('textos parámetricos form', this.dataView);
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

  public validateForm() {
    return (this.registerForm.valid) ? false : true;
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
    let valueForm = this.registerForm.value;
    console.log('Data enviada del form', valueForm);
    if (this.editData) {
      this.workflowSrv.editEmployee(this.editData, valueForm);
    } else {
      this.workflowSrv.createEmployee(valueForm);
    }
    this.initializeForm();
    this.onClose(false);
    this.router.navigate(['/employees']);
  }
}
