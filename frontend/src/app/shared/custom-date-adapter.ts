import {Injectable} from '@angular/core';
import {MatDateFormats, NativeDateAdapter} from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1; // Ustawienie pierwszego dnia tygodnia na poniedziałek (0: Niedziela, 1: Poniedziałek)
  }
  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return MONTHS[style];
  }
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
   return DAYS[style]
  }
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${this._to2digit(day)}.${this._to2digit(month)}.${year}`;
    } else if (displayFormat === 'monthYear') {
      const month = date.getMonth();
      const year = date.getFullYear();
      return `${MONTHS['long'][month]} ${year}`;
    } else {
      return date.toDateString(); // Domyślnie
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  override parse(value: string | number): Date | null {
    if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
      const str: string[] = value.split('.');
      if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1])
        ||isNaN(+str[2])) {
        return null;
      }
      return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]));
    }
    const timestamp: number = typeof value === 'number' ? value :
      Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
export const MONTHS = {
  'long': [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień',
    'Październik', 'Listopad', 'Grudzień'
  ],
  'short': ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
  'narrow': ['S', 'L', 'M', 'K', 'M', 'C', 'L', 'S', 'W', 'P', 'L', 'G']
};
export const DAYS = {
  'long': [
    'Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'
  ],
  'short': ['Nie','Pn','Wt','Śr','Czw','Pt','Sb'],
  'narrow': ['N','P','W','Ś','C','P','S']
};
