import { createAction, union } from '@ngrx/store';
import { Employee } from '../interfaces';

export const getEmployees = createAction('[Employee] get all employees');
export const getEmployeesSuccess = createAction('[Employee] get all employees success', (payload: Employee[]) => ({payload}));
export const getEmployeesError = createAction('[Employee] get all employees error');

const actions = union({
  getEmployees,
  getEmployeesSuccess,
  getEmployeesError
});

export type EmployeeActions = typeof actions;
