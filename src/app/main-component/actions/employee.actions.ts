import { createAction, union } from '@ngrx/store';
import { Employee, EmployeeUpdate } from '../interfaces';

export const getEmployees = createAction('[Employee] get all employees');
export const getEmployeesSuccess = createAction('[Employee] get all employees success', (payload: Employee[]) => ({payload}));
export const getEmployeesError = createAction('[Employee] get all employees error');

export const updateEmployees = createAction('[Employee] update employee', (payload: EmployeeUpdate) => ({payload}));
export const updateEmployeesSuccess = createAction('[Employee] update employee success', (payload: EmployeeUpdate) => ({payload}));
export const updateEmployeesError = createAction('[Employee] update employee Error');

const actions = union({
  getEmployees,
  getEmployeesSuccess,
  getEmployeesError,
  updateEmployees,
  updateEmployeesSuccess,
  updateEmployeesError
});

export type EmployeeActions = typeof actions;
