import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from '../components';
import { CustomerRoutingModule } from './customer-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffect, customerReducer } from '../store';
import { SharedModule } from '@src/app/shared/modules';
import { LoginModule } from '@src/app/login/modules';
import { CustomerModalComponent } from '../components/customer-modal';

@NgModule({
  declarations: [CustomerListComponent, CustomerModalComponent],
  entryComponents: [CustomerListComponent, CustomerModalComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    LoginModule,
    StoreModule.forFeature('customer', customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomerModule { }