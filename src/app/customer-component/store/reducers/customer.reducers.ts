import { CustomerActions, getCustomersSuccess } from '../actions';
import { Customer } from '../../interfaces';

export interface CustomerState {
  customers: Customer[];
}

const initialState = {
  customers: []
};

export function customerReducer(state: CustomerState = initialState, action: CustomerActions) {
  switch (action.type) {
    case getCustomersSuccess.type:
      return { ...state, customers: action.payload };
    default:
      return state;
  }
}
