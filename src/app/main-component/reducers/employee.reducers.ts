import { getEmployeesSuccess, getEmployeesError, EmployeeActions, updateEmployeesSuccess } from '../actions';
import { Employee } from '../interfaces';
export interface EmployeeState {
  employees: Employee[];
}
const initialState = {
  employees: [],
  updateSuccessful: null
};
export function employeeReducer(state: EmployeeState = initialState, action: EmployeeActions) {
  switch (action.type) {
    case getEmployeesSuccess.type:
      return { ...state, employees: action.payload };
    case updateEmployeesSuccess.type:
      return { ...state, updateSuccessful: action.payload };
    default:
      return state;
  }
}
