import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroCurrency',
  standalone: true,
})
export class EuroCurrencyPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (value === null || value === undefined) {
      return 'FEHLER';
    }
    return value.toFixed(2).replace('.', ',');
  }
}
