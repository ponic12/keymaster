import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'filterReg'
})

export class FilterReg implements PipeTransform {
    transform(items:any, criteria:any) : any {
        if (!criteria) return items;
        return items.filter(function(item){
            var fn = item.key.toLowerCase().includes(criteria.toLowerCase());
            return (fn);
        });
    }
}