import {Pipe, PipeTransform} from '@angular/core';

import {Product} from "../models/Product";


@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: Product[], filterText: string): any {
    if (filterText) {
      return list.filter(product => product.description.search(new RegExp(filterText, 'i')) > -1);
    }else{
      return list;
    }
  }
}


