import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from '../components';

@NgModule({
  declarations: [CustomerListComponent],
  entryComponents: [CustomerListComponent],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }