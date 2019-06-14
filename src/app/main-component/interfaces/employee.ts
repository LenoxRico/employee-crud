export interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image?: string;
  icon?: string;
}

export interface EmployeeUpdate {
  id?: number;
  name: string,
  salary: number,
  age: number,
  icon?: string;
}