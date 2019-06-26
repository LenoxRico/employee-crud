import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { updateEmployees, cleanEmployeeState } from '../../actions';
import { Employee, EmployeeUpdate } from '../../interfaces';
import { ModalData } from '../../interfaces/modal-data';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@src/app/shared/services';
import { EmployeeState } from '../../reducers';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnDestroy {
  employee: Employee;
  disableButton = true;
  nameEmployee: string;
  ageEmployee: number;
  salaryEmployee: number;

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private store: Store<any>,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.employee = this.data.employee;
    this.nameEmployee = this.employee.employee_name;
    this.ageEmployee = this.employee.employee_age;
    this.salaryEmployee = this.employee.employee_salary;
    this.store.select('employee').subscribe((state: EmployeeState) => {
      const { updateSuccessful, updateError } = state;
      if (updateSuccessful) {
        this.employee = { ...updateSuccessful, profile_image: this.employee.profile_image };
        this.disableButton = true;
        this.translate.get('shared.notification.success-edit').subscribe(text => {
          this.notificationService.showNotification(text, true);
        });
      } else if (updateError) {
        this.translate.get('shared.notification.error-edit').subscribe(text => {
          this.notificationService.showNotification(text, false);
        });
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

  ngOnDestroy() {
    this.store.dispatch(cleanEmployeeState());
  }
}
