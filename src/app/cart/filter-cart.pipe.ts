import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterCart'
})
export class FilterCartPipe implements PipeTransform {

  transform(value:any[], ...args: unknown[]): any[] {
    return value.filter((Product)=>Product.count !=0 );
  }

}
