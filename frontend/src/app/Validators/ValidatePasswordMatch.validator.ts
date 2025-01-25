import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export const passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.newPassword === control.value.confirmPassword
      ? null
      : { passwordMismatch: true };
  };
