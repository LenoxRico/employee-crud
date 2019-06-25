import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@src/app/shared/modules';
import { LoginComponent } from '../components';
import { AuthService } from '../services';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { AuthGuard } from '@src/app/login/guards';

@NgModule({
  declarations: [LoginComponent],
  entryComponents: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class LoginModule {}
