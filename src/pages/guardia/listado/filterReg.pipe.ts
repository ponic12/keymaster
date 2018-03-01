import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'filterReg'
})

export class FilterReg implements PipeTransform {
    transform(items:any, criteria:any) : any {
        if (!criteria) return items;
        return items.filter(function(item){
            //var reg = item.hora_reg.toLowerCase().includes(criteria.toLowerCase());
            //var dev = item.hora_dev.toLowerCase().includes(criteria.toLowerCase());
            var ll = item.llave.toLowerCase().includes(criteria.toLowerCase());
            var uid = item.empleado.toLowerCase().includes(criteria.toLowerCase());
            return ( ll || uid );
        });
    }
}