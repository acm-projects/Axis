import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: string[], prefix: string): string[] {
    return values.filter(value => value.toLowerCase().includes(prefix.toLowerCase()));
  }

}
