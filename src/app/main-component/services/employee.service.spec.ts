import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Employee, EmployeeUpdate } from '../interfaces';

fdescribe('EmployeeService', () => {
  let http: HttpClient;
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EmployeeService, HttpClient]
    });
    http = TestBed.get(HttpClient);
    service = TestBed.get(EmployeeService);
  });

  it('Service should be exist', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('200 get all', done => {
      const employees: Employee[] = [
        {
          id: 1,
          employee_age: 12,
          employee_salary: 2000,
          employee_name: 'Pedro Paramo'
        },
        {
          id: 2,
          employee_age: 12,
          employee_salary: 5000,
          employee_name: 'Pablo Paramo'
        }
      ];
      spyOn(http, 'get').and.callFake(urlApi => {
        return of(employees);
      });
      service.getEmployees().subscribe(result => {
        expect(result).toEqual(employees);
        done();
      });
    });
  });

  describe('PUT', () => {
    it('200 update employee', done => {
      const employeeUpdate: EmployeeUpdate = {
        age: 12,
        id: 1,
        name: 'Pedro Paramo',
        salary: 4000
      };
      spyOn(http, 'put').and.callFake((urlApi, employee) => {
        return of(employee);
      });
      service.updateEmployee(employeeUpdate).subscribe(result => {
        expect(employeeUpdate).toEqual(result);
        done();
      });
    });
  });

  describe('DELETE', () => {
    it('200 delete employee', done => {
      const employees: Employee[] = [
        {
          id: 1,
          employee_age: 12,
          employee_salary: 2000,
          employee_name: 'Pedro Paramo'
        }
      ];
      spyOn(http, 'delete').and.callFake(urlApi => {
        return of({ success: { text: 'successfully! deleted Records' } });
      });
      service.deleteEmployee(employees[0]).subscribe(result => {
        expect(result).toEqual({ success: { text: 'successfully! deleted Records' } });
        done();
      });
    });
  });

  it('Update Seniority should change the icon', () => {
    const employees: Employee[] = [
      {
        id: 1,
        employee_age: 12,
        employee_salary: 2000,
        employee_name: 'Pedro Paramo'
      }
    ];
    expect(service.updateSeniority(employees[0].employee_salary)).toBe('directions_run');
  });
});
