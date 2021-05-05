import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuxComponent } from './aux/aux.component';
// import { AuxComponent } from './aux/aux.component';

const routes: Routes = [
  {
    path: 'f',
    component: AuxComponent
  },
  {
    path: '',
    loadChildren: () => import('src/app/modules/employees/employees.module').then( m => m.EmployeesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
