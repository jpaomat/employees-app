import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor() { }

  public organizeDataView(typeData, initialData, finalData?) {
    let arrayTerms = [];
    let keysData = [];
    /* istanbul ignore else*/
    if (initialData) {
      if (typeData === 'texts') {
        keysData = Object.keys(finalData);
        initialData.forEach((element, i) => {
          finalData[keysData[i]] = element[keysData[i]];
        });
      } else {
        keysData = Object.keys(initialData);
        keysData.forEach((element, i) => {
          arrayTerms[i] = initialData[keysData[i]];
        });
        return arrayTerms;
      }
    }
  }

}
