import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductFormModalService } from 'src/app/core/services/productFormModal/product-form-modal.service';

import { Router } from '@angular/router';
import FORM from 'src/app/config/dataTest/form.json';
import { DataManagementService } from 'src/app/core/services/dataManagement/data-management.service';

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
  public inventoryForm: FormGroup;
  public categories: string[];
  public category: string;
  public title: string;
  public header: string;
  public dataView = {
    parametricTexts: {
      title: [],
      header: [],
      placeholders: [],
      footer: [],
      buttons: []
    }
  }

  constructor(
    private productFormService: ProductFormModalService,
    private formBuilder: FormBuilder,
    public router: Router,
    private dataManagementService: DataManagementService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeData();
    this.getData();
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
          console.log('data recibida en modal', response, this.activateInput);
          return;
        }
      }
    });
    console.log('textos parámetricos form', this.dataView);
  }

  private initializeForm(): void {
    this.sectionInput = false;
    this.registerForm = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      reference: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      image: []
    });
    this.inventoryForm = this.formBuilder.group({
      invoiceNumber: [],
      inputAmount: [],
      invoicedAmount: [],
      reference: []
    });
  }

  private getData(): void {
    this.categories = JSON.parse(localStorage.getItem("categories"));
  }

  public captureImage(event): void {
    // this.registerForm.get('image').setValue(event.target.files[0]);
  }

  public onUpload(e): void {
    const id = Math.random().toString(36).substring(2); // generar id random para la imagen
    const file = e.target;
  }

  public onChange(e): void {
    this.category = e.target.value;
    console.log('category', this.category);
  }

  public getTexts(): void {
    let index = (this.activateInput) ? 1 : 0;
    this.title = this.dataView.parametricTexts.title[index].text;
    this.header = this.dataView.parametricTexts.header[index].text;
  }

  public onClick(state): void {
    this.sectionInput = true;
    this.activateInput = (state == 'new') ? false : true;
    this.getTexts();
  }

  public validateForm() {
    let valueFormInventory = this.inventoryForm.value;
    return (this.registerForm.valid || valueFormInventory.inputAmount) ? false : true;
    // return (this.registerForm.valid && this.registerForm.get('image').value) ? false : true;
  }

  public onClose(state): void {
    this.productFormService.showModal({
      activateModal: state,
      activateInput: false
    });
    this.initializeForm();
  }

  public onCall(): void {
    let valueForm = this.registerForm.value;
    let valueFormInventory = this.inventoryForm.value;
    console.log('register form', valueForm, valueFormInventory);
    const id = Math.random().toString(36).substring(2);
    // this.requestsService.saveData(valueForm, id, this.requestsService.getCollection(this.category));
    // if (valueFormInventory.inputAmount) {
    //   this.requestsService.saveData(valueFormInventory, id, this.requestsService.getCollection('inputs'));
    // }
    this.initializeForm();
    this.onClose(false);
    this.router.navigate(['/']);
  }
}
