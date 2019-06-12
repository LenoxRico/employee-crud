import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthComponent, NotFoundComponent } from './alternative/components';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: './main-component/modules/main.module#MainModule'
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
