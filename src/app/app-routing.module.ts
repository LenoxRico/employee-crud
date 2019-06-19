import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthComponent, NotFoundComponent } from './alternative/components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadChildren: './login/modules/login.module#LoginModule'
  },
  {
    path: 'home',
    loadChildren: './main-component/modules/main.module#MainModule'
  },
  {
    path: 'customer',
    loadChildren: './customer-component/modules/customer.module#CustomerModule'
  },
  {
    path: 'no-auth',
    component: NoAuthComponent
  },
  { 
    path: '**', 
    redirectTo: '/not-found' 
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
