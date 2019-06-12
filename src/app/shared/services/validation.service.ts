import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorType } from '../interfaces';

@Injectable()
export class ValidationService {
  private config: ErrorType;

  constructor(private translate: TranslateService) {}

  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    this.translate.get('errorsValidate').subscribe((error: any) => {
      this.config = {
        required: error.required,
        invalidNumber: error.invalidNumber,
        invalidAlphanumber: error.invalidAlphanumber,
        invalidCero: error.invalidCero,
        minlength: `${error.minlength} ${validatorValue.requiredLength} ${error.characters}`,
        maxlength: `${error.maxlength} ${validatorValue.requiredLength} ${error.characters}`,
        emptySpace: error.emptySpace,
        min: `${error.min} ${validatorValue.min}`,
        max: `${error.max} ${validatorValue.min}`
      };
    });
    return this.config[validatorName];
  }

  maxLengthValidator(control) {
    return control.value > 50 ? { maxlength: true } : null;
  }

  notCeroValidator(control) {
    return !control.value || Number(control.value) !== 0 ? null : { invalidCero: true };
  }

  numberValidator(control) {
    return (control.value !== null && String(control.value).match(/^\d*$/)) || !control.value ? null : { invalidNumber: true };
  }

  alphanumericValidator(control) {
    return (control.value !== null && String(control.value).match(/^[a-z0-9]+$/i)) || !control.value ? null : { invalidAlphanumber: true };
  }

  emptySpaceValidator(control) {
    if (typeof control.value === 'string') {
      return (control.value !== null && control.value.replace(/\s/g, '').length > 0) || !control.value ? null : { emptySpace: true };
    }
  }
}
