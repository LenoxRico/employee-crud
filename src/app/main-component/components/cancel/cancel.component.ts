import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../interfaces';
import { ModalData } from '../../interfaces/modal-data';
import { deleteEmployees, cleanEmployeeState } from '../../actions';
import { EmployeeState } from '../../reducers';
import { NotificationService } from '@src/app/shared/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit,OnDestroy {
  employee: Employee;
  employeeStorage$: Observable<Employee[]>;

  constructor(
    private dialogRef: MatDialogRef<CancelComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private store: Store<any>,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.employee = this.data.employee;
    this.store.select('employee').subscribe((state: EmployeeState) => {
      if (state.deleteSuccessful) {
        this.cancel();
        this.translate.get('shared.notification.success-delete').subscribe(text => {
          this.notificationService.showNotification(text, true);
        });
      }else if(state.deleteError){
        this.translate.get('shared.notification.error-delete').subscribe(text => {
          this.notificationService.showNotification(text, false);
        });
      }
    });
  }

  ngOnInit(){}

  accept() {
    this.store.dispatch(deleteEmployees(this.employee));
  }

  cancel() {
    this.dialogRef.close(false);
  }

  ngOnDestroy(){
    this.store.dispatch(cleanEmployeeState());
  }
}
