import { createAction, union } from '@ngrx/store';
import { Employee, EmployeeUpdate } from '../interfaces';

export const getEmployees = createAction('[Employee] get all employees');
export const getEmployeesSuccess = createAction('[Employee] get all employees success', (payload: Employee[]) => ({ payload }));
export const getEmployeesError = createAction('[Employee] get all employees error');

export const updateEmployees = createAction('[Employee] update employee', (payload: EmployeeUpdate) => ({ payload }));
export const updateEmployeesSuccess = createAction('[Employee] update employee success', (payload: Employee) => ({ payload }));
export const updateEmployeesError = createAction('[Employee] update employee Error');

export const deleteEmployees = createAction('[Employee] delete employee', (payload: Employee) => ({ payload }));
export const deleteEmployeesSuccess = createAction('[Employee] delete employee success', (payload: any) => ({ payload }));
export const deleteEmployeesError = createAction('[Employee] delete employee Error');

export const cleanEmployeeState = createAction('[Employee] clean states');

const actions = union({
  getEmployees,
  getEmployeesSuccess,
  getEmployeesError,
  updateEmployees,
  updateEmployeesSuccess,
  updateEmployeesError,
  deleteEmployees,
  deleteEmployeesSuccess,
  deleteEmployeesError,
  cleanEmployeeState
});

export type EmployeeActions = typeof actions;
