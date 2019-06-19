import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from '../components';
import { AuthGuard } from '../../login/guards/auth.guard';

const routes: Routes = [{ path: '', 
canActivate: [AuthGuard],
component: CustomerListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}