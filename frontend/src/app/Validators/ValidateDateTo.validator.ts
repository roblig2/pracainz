import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const ValidateDateToValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const form = control as FormGroup;
    const dateFrom = form.get('calendarFrom')?.value? (form.get('calendarFrom')?.value as Date).toLocaleDateString() : null;
    const dateTo = form.get('calendarTo')?.value ? (form.get('calendarTo')?.value as Date).toLocaleDateString(): null;

  if (!dateFrom || !dateTo) {
    return null;
  }

  const dateFromParsed = parseDate(dateFrom);
  const dateToParsed = parseDate(dateTo);

  if (dateFromParsed > dateToParsed) {
    return { dateToInvalid:  {value: true} };
  }
  return null;
};
function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

