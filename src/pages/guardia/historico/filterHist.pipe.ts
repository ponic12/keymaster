import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'filterHist'
})

export class FilterHist implements PipeTransform {
    transform(items:any, criteria:any) : any {
        if (!criteria) return items;
        return items.filter(function(item){
            //var reg = item.hora_reg.toLowerCase().includes(criteria.toLowerCase());
            //var dev = item.hora_dev.toLowerCase().includes(criteria.toLowerCase());
            var ll = item.llave.toLowerCase().includes(criteria.toLowerCase());
            var ur = item.emp_reg.toLowerCase().includes(criteria.toLowerCase());
            var ud = item.emp_dev.toLowerCase().includes(criteria.toLowerCase());
            return ( ll || ur || ud );
        });
    }
}