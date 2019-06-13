import { getEmployeesSuccess, getEmployeesError, EmployeeActions } from '../actions';
import { Employee } from '../interfaces';
export interface EmployeeState {
  employees: Employee[];
}
const initialState = {
  employees: []
};
export function employeeReducer(state: EmployeeState = initialState, action: EmployeeActions) {
  switch (action.type) {
    case getEmployeesSuccess.type:
      return { ...state, employees: action.payload };
    default:
      return state;  
  }
}
