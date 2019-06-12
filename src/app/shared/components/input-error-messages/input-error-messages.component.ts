import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-input-error-messages',
  template: `
    <ng-container *ngIf="errorMessage !== null">{{ errorMessage }}</ng-container>
  `,
  styleUrls: ['./input-error-messages.component.scss']
})
export class InputErrorMessagesComponent {
  @Input() addAuxClass: boolean;
  @Input() control: FormControl;
  @Input() submitted: boolean;

  constructor(public validationService: ValidationService) {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if ((this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) || (this.control.pristine && this.submitted)) {
        return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
