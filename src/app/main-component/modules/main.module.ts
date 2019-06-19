import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/modules';
import { UsersListComponent } from '../components';
import { MainRoutingModule } from './main-routing.module';
import { EmployeeService } from '../services';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffect } from '../effects';
import { EmployeeModalComponent, CancelComponent } from '../components';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersListComponent, EmployeeModalComponent, CancelComponent],
  entryComponents: [UsersListComponent, EmployeeModalComponent, CancelComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature('employee', employeeReducer),
    EffectsModule.forFeature([EmployeeEffect])
  ],
  providers: [EmployeeService]
})
export class MainModule {}
