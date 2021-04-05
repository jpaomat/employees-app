import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    PipesModule
  ],
  exports: [
  ]
})
export class UiComponentsModule { }
