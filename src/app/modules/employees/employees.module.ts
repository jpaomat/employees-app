import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [EmployeesComponent, HomeComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PipesModule,
    NgbModule

  ]
})
export class EmployeesModule { }
