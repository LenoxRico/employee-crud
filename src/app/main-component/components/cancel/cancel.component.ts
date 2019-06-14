import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../../interfaces';
import { ModalData } from '../../interfaces/modal-data';
import { deleteEmployees } from '../../actions';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
  employee: Employee;
  employeeStorage$: Observable<Employee[]>;

  constructor(
    private dialogRef: MatDialogRef<CancelComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private store: Store<any>
  ) {
    this.employeeStorage$ = store.select('employee');
    this.employee = this.data.employee;
  }

  ngOnInit() {}

  accept() {
    this.store.dispatch(deleteEmployees(this.employee));
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
