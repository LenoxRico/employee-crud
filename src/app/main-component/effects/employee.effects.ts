import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CoreService } from '@src/app/shared/services';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  deleteEmployees,
  deleteEmployeesError,
  deleteEmployeesSuccess,
  EmployeeActions,
  getEmployees,
  getEmployeesError,
  getEmployeesSuccess,
  updateEmployees,
  updateEmployeesError,
  updateEmployeesSuccess
} from '../actions/employee.actions';
import { Employee } from '../interfaces';
import { EmployeeService } from '../services';

@Injectable()
export class EmployeeEffect {
  constructor(private actions: Actions, private employeeService: EmployeeService, private coreServices: CoreService) {}

  @Effect()
  getEmployees$: Observable<EmployeeActions> = this.actions.pipe(
    ofType(getEmployees.type),
    switchMap(action => {
      this.coreServices.displaySpinner(true);
      return this.employeeService.getEmployees().pipe(
        map(employees => {
          this.coreServices.displaySpinner(false);
          return { type: getEmployeesSuccess.type, payload: employees.filter((e, index) => e.employee_age > 0 && index < 400) };
        }),
        catchError(() => {
          this.coreServices.displaySpinner(false);
          return of({ type: getEmployeesError.type });
        })
      );
    })
  );

  @Effect()
  updateEmployees$: Observable<EmployeeActions> = this.actions.pipe(
    ofType(updateEmployees.type),
    switchMap((action: any) => {
      this.coreServices.displaySpinner(true);
      return this.employeeService.updateEmployee(action.payload).pipe(
        map(employee => {
          this.coreServices.displaySpinner(false);
          const updatedEmployee: Employee = {
            id: employee.id,
            employee_name: employee.name,
            employee_salary: employee.salary,
            employee_age: employee.age,
            icon: this.employeeService.updateSeniority(employee.salary)
          };
          return { type: updateEmployeesSuccess.type, payload: updatedEmployee };
        }),
        catchError(() => {
          this.coreServices.displaySpinner(false);
          return of({ type: updateEmployeesError.type });
        })
      );
    })
  );

  @Effect()
  deleteEmployees$: Observable<EmployeeActions> = this.actions.pipe(
    ofType(deleteEmployees.type),
    switchMap((action: any) => {
      this.coreServices.displaySpinner(true);
      return this.employeeService.deleteEmployee(action.payload).pipe(
        map(response => {
          this.coreServices.displaySpinner(false);
          return { type: deleteEmployeesSuccess.type, payload: { employee: action.payload, success: response } };
        }),
        catchError(() => {
          this.coreServices.displaySpinner(false);
          return of({ type: deleteEmployeesError.type });
        })
      );
    })
  );
}
