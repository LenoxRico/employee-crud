import { ErrorRequest } from '@src/app/shared/interfaces';
import {
  cleanEmployeeState,
  deleteEmployeesError,
  deleteEmployeesSuccess,
  EmployeeActions,
  getEmployeesSuccess,
  updateEmployeesError,
  updateEmployeesSuccess
} from '../actions';
import { Employee } from '../interfaces';

export interface EmployeeState {
  employees: Employee[];
  updateSuccessful: Employee;
  deleteSuccessful: Employee;
  deleteError: ErrorRequest;
  updateError: ErrorRequest;
}

const initialState = {
  employees: [],
  updateSuccessful: null,
  deleteSuccessful: null,
  deleteError: null,
  updateError: null
};

export function employeeReducer(state: EmployeeState = initialState, action: EmployeeActions) {
  switch (action.type) {
    case getEmployeesSuccess.type:
      return { ...state, employees: action.payload };
    case updateEmployeesSuccess.type:
      const employees = [action.payload, ...state.employees.filter(e => e.id !== action.payload.id)];
      return { ...state, updateSuccessful: action.payload, employees };
    case deleteEmployeesSuccess.type:
      return {
        ...state,
        deleteSuccessful: action.payload.employee,
        employees: state.employees.filter(employee => {
          return employee.id !== action.payload.employee.id;
        })
      };
    case deleteEmployeesError.type:
      return {
        ...state,
        deleteError: {
          code: 500,
          message: 'Server Error :('
        }
      };
    case updateEmployeesError.type:
      return {
        ...state,
        updateError: {
          code: 500,
          message: 'Server Error :('
        }
      };
    case cleanEmployeeState.type:
      return {
        ...state,
        updateSuccessful: null,
        deleteSuccessful: null,
        deleteError: null,
        updateError: null
      };
    default:
      return state;
  }
}
