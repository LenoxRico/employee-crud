import { createAction, union } from '@ngrx/store';
import { Customer } from '../../interfaces';

export const getCustomers = createAction('[Customer] get all Customers');
export const getCustomersSuccess = createAction('[Customer] get all Customers success', (payload: Customer[]) => ({ payload }));
export const getCustomersError = createAction('[Customer] get all Customers error');

const actions = union({
    getCustomers,
    getCustomersSuccess,
    getCustomersError
  });
  
  export type CustomerActions = typeof actions;