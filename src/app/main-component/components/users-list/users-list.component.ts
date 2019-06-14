import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee, SeniorityTypes } from '../../interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getEmployees } from '../../actions';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { EmployeeModalComponent } from '../employee-modal';
import { EmployeeService } from '../../services';
import { CancelComponent } from '../cancel';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  employeeStorage$: Observable<Employee[]>;
  seniorityTypes = SeniorityTypes;
  title = 'Employee List';
  displayedColumns: string[] = ['icon', 'name', 'years', 'delete'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private store: Store<any>, private employeeService: EmployeeService) {
    this.employeeStorage$ = this.store.select(state => state.employee.employees);
  }

  ngOnInit() {
    this.store.dispatch(getEmployees());
    this.employeeStorage$.subscribe(employees => {
      employees.map(e => {
        this.dataSource = new MatTableDataSource(employees);
        this.dataSource.paginator = this.paginator;
        e.icon = this.employeeService.updateSeniority(e.employee_salary);
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(employee: Employee): void {
    const defaultImage = 'assets/persona2.png';
    const dialogRef = this.dialog.open(EmployeeModalComponent, {
      width: '700px',
      data: {
        employee: {
          ...employee,
          profile_image: employee.profile_image ? employee.profile_image : defaultImage
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(CancelComponent, {
      width: '500px',
      data: {
        employee: { employee }
      }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
