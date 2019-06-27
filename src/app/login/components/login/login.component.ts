import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService, CoreService } from '@src/app/shared/services';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginData = { username: '', password: '' };

  constructor(
    private _service: AuthService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private coreServices: CoreService
  ) {}

  login() {
    this.coreServices.displaySpinner(true);
    this._service.obtainAccessToken(this.loginData).subscribe(
      data => {
        this._service.saveToken(data);
        this.coreServices.displaySpinner(false);
        this.translate.get('shared.notification.success-login').subscribe(text => {
          this.notificationService.showNotification(text, true);
        });
      },
      err => {
        this.coreServices.displaySpinner(false);
        this.translate.get('shared.notification.error-login').subscribe(text => {
          this.notificationService.showNotification(text, false);
        });
      }
    );
  }
}
