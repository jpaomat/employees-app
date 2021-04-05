import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPipe } from './current/current.pipe';
import { FilterPipe } from './filter/filter.pipe';



@NgModule({
  declarations: [CurrentPipe, FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CurrentPipe,
    FilterPipe
  ]
})
export class PipesModule { }
