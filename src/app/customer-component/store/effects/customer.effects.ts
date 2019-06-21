import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CoreService } from '@src/app/shared/services';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../services';
import { CustomerActions, getCustomers, getCustomersError, getCustomersSuccess } from '../actions';

@Injectable()
export class CustomerEffect {
  constructor(private actions: Actions, private coreServices: CoreService, private customerService: CustomerService) {}

  @Effect()
  getCustomers$: Observable<CustomerActions> = this.actions.pipe(
    ofType(getCustomers.type),
    switchMap(action => {
      this.coreServices.displaySpinner(true);
      return this.customerService.getCustomers();
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
