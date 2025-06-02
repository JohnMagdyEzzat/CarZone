import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egpCurrency',
})
export class EgpCurrencyPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (value) {
      let strValue = value.toLocaleString();
      strValue += ' EGP';
      return strValue;
    } else {
      return null;
    }
  }
}
