import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../interfaces';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { getCustomers } from '../../store';
import { CustomerModalComponent } from '../customer-modal';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customerStorage$: Observable<Customer[]>;
  title = 'Customer List';
  displayedColumns: string[] = ['icon', 'name', 'lastname'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private store: Store<any>) {
    this.customerStorage$ = this.store.select(state => state.customer.customers);
  }

  ngOnInit() {
    this.store.dispatch(getCustomers());
    this.customerStorage$.subscribe(customers => {
      customers.map(c => {
        this.dataSource = new MatTableDataSource(customers);
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  openDialog(customer: Customer): void {
    const defaultImage = 'assets/persona3.png';
    const dialogRef = this.dialog.open(CustomerModalComponent, {
      width: '700px',
      data: {
        customer: {
          ...customer,
          profile_image: defaultImage
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
