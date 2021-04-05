import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'current'
})
export class CurrentPipe implements PipeTransform {

  transform(value: any): string {
    value = (typeof value === 'string') ? parseInt(value) : value;
    return '$' + value.toLocaleString('de-DE', { style: 'decimal' }).toString();
  }

}
