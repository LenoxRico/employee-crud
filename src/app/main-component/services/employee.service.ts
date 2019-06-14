import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeeUpdate, SeniorityIcons } from '../interfaces';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://dummy.restapiexample.com/api/v1/employees');
  }

  updateEmployee(employee: EmployeeUpdate): Observable<EmployeeUpdate> {
    return this.http.put<EmployeeUpdate>(`http://dummy.restapiexample.com/api/v1/update/${employee.id}`, employee);
  }

  updateSeniority(employee_salary:number) {
    let icon = SeniorityIcons.SENIOR;
    if (employee_salary < 10000) {
      icon = SeniorityIcons.JUNIOR;
    } else if (employee_salary >= 10000 && employee_salary < 40000) {
      icon = SeniorityIcons.ADVANCE;
    } else if (employee_salary >= 40000 && employee_salary < 100000) {
      icon = SeniorityIcons.SEMI_SENIOR;
    } 

    return icon;
  }
}
