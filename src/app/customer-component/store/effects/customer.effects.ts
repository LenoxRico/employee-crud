import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CoreService } from '@src/app/shared/services';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
    getCustomers,
    getCustomersSuccess,
    getCustomersError,
    CustomerActions
} from '../actions';
import { Customer } from '../../interfaces';

@Injectable()
export class CustomerEffect {
  constructor(private actions: Actions, private coreServices: CoreService) {}

  @Effect()
  getCustomers$: Observable<CustomerActions> = this.actions.pipe(
    ofType(getCustomers.type),
    switchMap(action => {
      this.coreServices.displaySpinner(true);
      return of([
        {
            "id": 1,
            "firstName": "pedre",
            "lastName": "paramo",
            "zipCode": "123dss"
        },
        {
            "id": 2,
            "firstName": "Daniel",
            "lastName": "Puerta",
            "zipCode": "152df"
        }
      ])
    //   return this.employeeService.getEmployees();
    }),
    map(customers => {
      this.coreServices.displaySpinner(false);
      return { type: getCustomersSuccess.type, payload: customers };
    }),
    catchError(() => {
      this.coreServices.displaySpinner(false);
      return of({ type: getCustomersError.type });
    })
  );
}
