import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeUpdate } from '../interfaces';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://dummy.restapiexample.com/api/v1/employees');
  }

  updateEmployee(employee: EmployeeUpdate): Observable<EmployeeUpdate>{
    return this.http.put<EmployeeUpdate>(`http://dummy.restapiexample.com/api/v1/update/${employee.id}`, employee);
  }
}
