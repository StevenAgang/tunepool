import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CompactNumber',
})
export class CompactNumber implements PipeTransform {
  transform(value: number) {
    if (value >= 1000) return (value / 1000).toPrecision(3) + 'K';
    if (value >= 1_000_000) return (value / 1_000_000).toPrecision(2) + 'M';
    return;
  }
}
