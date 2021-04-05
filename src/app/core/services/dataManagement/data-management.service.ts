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

  public getProductsWithOffer(products){
    let keysProducts = Object.keys(products);
    let productsWithDiscount = [];
    keysProducts.forEach(product => {
      products[product].forEach(element => {
        if (element.discount > 0) {
          productsWithDiscount.push(element);
        }
      });
    });
    return productsWithDiscount;
  }
}
