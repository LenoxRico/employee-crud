import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { EmployeeActions, getEmployees, getEmployeesError, getEmployeesSuccess } from '../actions/employee.actions';
import { EmployeeService } from '../services';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, take } from 'rxjs/operators';
import { CoreService } from '@src/app/shared/services';

@Injectable()
export class EmployeeEffect {
  constructor(private actions: Actions, private employeeService: EmployeeService, private coreServices: CoreService) {}

  @Effect()
  getEmployees$: Observable<EmployeeActions> = this.actions.pipe(
    ofType(getEmployees.type),
    switchMap(action => {
      this.coreServices.displaySpinner(true);
      return this.employeeService.getEmployees();
    }),
    map(employees => {
      this.coreServices.displaySpinner(false);
      return { type: getEmployeesSuccess.type, payload: employees.filter((e, index) => e.employee_age > 0 && index < 400) };
    }),
    catchError(() => {
      this.coreServices.displaySpinner(false);
      return of({ type: getEmployeesError.type });
    })
  );
}
