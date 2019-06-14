import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { updateEmployees } from '../../actions';
import { Employee, EmployeeUpdate } from '../../interfaces';
import { ModalData } from '../../interfaces/modal-data';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent {
  employee: Employee;
  disableButton = true;
  title = 'Employee Details';
  nameEmployee: string;
  ageEmployee: number;
  salaryEmployee: number;

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private store: Store<any>
  ) {
    this.employee = this.data.employee;
    this.nameEmployee = this.employee.employee_name;
    this.ageEmployee = this.employee.employee_age;
    this.salaryEmployee = this.employee.employee_salary;
    this.store
      .select(state => state.employee.updateSuccessful)
      .subscribe((updateSuccessful: Employee) => {
        if (updateSuccessful && updateSuccessful.id === this.employee.id) {
          this.employee = { ...updateSuccessful, profile_image: this.employee.profile_image };
          this.disableButton = true;
        }
      });
  }

  edit() {
    this.disableButton = false;
  }

  accept(id: number) {
    const data: EmployeeUpdate = {
      id,
      name: this.nameEmployee,
      age: this.ageEmployee,
      salary: this.salaryEmployee
    };
    this.store.dispatch(updateEmployees(data));
  }

  cancel() {
    this.disableButton ? this.dialogRef.close(false) : (this.disableButton = true);
  }
}
