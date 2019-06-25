import { Component, OnInit, Inject } from '@angular/core';
import { Customer, ModalData } from '../../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent {
  customer: Customer;

  constructor(
    public dialogRef: MatDialogRef<CustomerModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private store: Store<any>
  ) {
    this.customer = this.data.customer;
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
