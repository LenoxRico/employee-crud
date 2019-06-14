import { Component, OnInit } from '@angular/core';
import { Employee, SeniorityTypes, SeniorityIcons } from '../../interfaces';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getEmployees } from '../../actions';
import { MatDialog } from '@angular/material';
import { EmployeeModalComponent } from '../employee-modal';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  employeeStorage$: Observable<Employee[]>;
  seniorityTypes = SeniorityTypes;
  title = 'Employee List';

  constructor(private dialog: MatDialog, private store: Store<any>) {
    this.employeeStorage$ = this.store.select(state=>state.employee.employees);
  }

  ngOnInit() {
    this.store.dispatch(getEmployees());
    this.employeeStorage$.subscribe(employees => {
      employees.map(e => {
        if (e.employee_salary < 10000) {
          e.icon = SeniorityIcons.JUNIOR;
        } else if (e.employee_salary >= 10000 && e.employee_salary < 40000) {
          e.icon = SeniorityIcons.ADVANCE;
        } else if (e.employee_salary >= 40000 && e.employee_salary < 100000) {
          e.icon = SeniorityIcons.SEMI_SENIOR;
        } else {
          e.icon = SeniorityIcons.SENIOR;
        }
      });
    });
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
}
