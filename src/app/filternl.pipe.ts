import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filternl'
})
export class FilternlPipe implements PipeTransform {

  transform(items: any, filter: any, isAndOperationBwCol:boolean): any {
    
    if (filter && Array.isArray(items)) {
     let filterKeys = Object.keys(filter);
      if (isAndOperationBwCol) {
      //  return items.filter(item =>
      //     filterKeys.reduce((memo, keyName) =>
      //         (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
       return items.filter(item => {
        return filterKeys.some((keyName) => {
          console.log(keyName);
          return filter[keyName].toLocaleLowerCase().trim() === item[keyName].toLocaleLowerCase().trim()|| filter[keyName] === "";
          //return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
        });
      });
     }
    } else {
     return items;
    }
  }

}
