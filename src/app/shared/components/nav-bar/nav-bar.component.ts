import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/login/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Languages, DefaultLanguage } from '../../interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  src = 'assets/logo.gif';
  login: Observable<string>;
  languages = Languages;
  selectedLanguage = DefaultLanguage;

  constructor(private authService: AuthService, private _router: Router, private translate: TranslateService) {}

  ngOnInit() {
    this.login = this.authService.getLoginStatus().pipe(tap(item => console.log(item)));
  }

  checkLogin() {
    this.authService.checkCredentials() ? this.authService.logout() : this._router.navigate(['/login']);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    Cookie.set('language', language);
  }
}
