import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padStart',
  standalone: true
})
export class PadStart implements PipeTransform {

  transform(value: number) {
    let numToString = value.toString().padStart(2, '0');
    return numToString;
  }

}
