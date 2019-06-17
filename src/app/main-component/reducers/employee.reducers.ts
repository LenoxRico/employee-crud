import { deleteEmployeesSuccess, EmployeeActions, getEmployeesSuccess, updateEmployeesSuccess } from '../actions';
import { Employee, EmployeeUpdate } from '../interfaces';

export interface EmployeeState {
  employees: Employee[];
  updateSuccessful: EmployeeUpdate;
  deleteSuccessful: Employee;
}

const initialState = {
  employees: [],
  updateSuccessful: null,
  deleteSuccessful: null
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
    default:
      return state;
  }
}
