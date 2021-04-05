import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Modal } from '../../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class ProductFormModalService {

  private show: BehaviorSubject<any | null> = new BehaviorSubject<any|null>(null)
  constructor( ) { }

  public showModal(data: Modal): void{
    this.show.next(data);
  }

  public clearModal(): void{
    this.show.next(null);
  }

  public getModal(): Observable<any>{
    return this.show.asObservable();
  }
}
