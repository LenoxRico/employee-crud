import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Employee, EmployeeUpdate } from '../../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ModalData } from '../../interfaces/modal-data';
import { Store } from '@ngrx/store';
import { updateEmployees } from '../../actions';

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
    private dialog: MatDialog,
    private cs: ChangeDetectorRef,
    private store: Store<any>
  ) {
    this.employee = this.data.employee;
    this.nameEmployee = this.employee.employee_name;
    this.ageEmployee = this.employee.employee_age;
    this.salaryEmployee = this.employee.employee_salary;
  }

  /*private checkAcceptButton(formControl: AbstractControl) {
    return formControl.value === 0 || (!formControl.valid && !formControl.disabled) ? true : false;
  }*/

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
    /*const createApplication: CreateApplication = {
      idPersona: this.persona.idPersona,
      status: this.persona.status,
      username: this.persona.name,
      originalLimitIncrease: this.persona.creditLimitIncrease,
      newLimitIncrease: this.step2Component.form.getRawValue().creditLimitIncrease,
      newTotalLimit: this.step2Component.newRequestedTotalCredit
    };

    this.completed = true;
    this.store.dispatch(acceptPersonaOffer({ information: createApplication, dialogRef: this.dialogRef, stepper: stepper }));*/
  }

  cancel() {
    this.disableButton ? this.dialogRef.close(false) : (this.disableButton = true);
    /*const dialogRef = this.dialog.open(CancelComponent, { data: { persona: this.persona } });

    dialogRef.afterClosed().subscribe(cancel => {
      if (cancel) {
        this.dialogRef.close();
      }
    });*/
  }
}
