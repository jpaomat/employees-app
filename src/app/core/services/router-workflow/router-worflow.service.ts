import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class RouterWorflowService {

  constructor(
    private http: HttpClient
  ) { }

  public getEmployes(): Observable<any> {
    return this.http.get<any>(environment.BASE_URL);
  }

  public getEmployesById(idEmployee: string): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/${idEmployee}`);
  }

  public createEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(environment.BASE_URL, employee);
  }

  public editEmployee(id: string, employee): Observable<any> {
    return this.http.put<any>(`${environment.BASE_URL}/${id}`, employee);
  }

  public deleteEmployee(idEmployee: string): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/${idEmployee}`);
  }
}
