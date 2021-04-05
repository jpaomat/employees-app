import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { AuxComponent } from './aux/aux.component';


@NgModule({
  declarations: [AuxComponent],
  imports: [
    CommonModule,
    BaseRoutingModule
  ]
})
export class BaseModule { }
