import { getEmployeesSuccess, EmployeeActions, updateEmployeesSuccess, deleteEmployeesSuccess } from '../actions';
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
      const employees = [action.payload, ...state.employees.filter(e => e.id !== action.payload.id)];
      return { ...state, updateSuccessful: action.payload, employees };
    case deleteEmployeesSuccess.type:
        // return state.employees.filter(employee => {
        //   return employee.id !== action.payload.id;
        // });
        return state;
    default:
      return state;
  }
}
