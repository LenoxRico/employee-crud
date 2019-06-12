import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SpinnerComponent, InputErrorMessagesComponent } from '../components';

import { ValidationService } from '../services';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [SpinnerComponent, InputErrorMessagesComponent],
  imports: [CommonModule, FlexLayoutModule, RouterModule, ReactiveFormsModule, TranslateModule],
  exports: [
    FlexLayoutModule,
    SpinnerComponent,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    InputErrorMessagesComponent
  ],
  providers: [ ValidationService]
})
export class SharedModule {}
