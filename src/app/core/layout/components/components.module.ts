import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalComponent } from './form-modal/form-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FormModalComponent
  ]
})
export class ComponentsModule { }
