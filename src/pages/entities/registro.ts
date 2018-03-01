export class Registro {
    id?:string;
    empleado:string;
    hora_dev?:number = new Date().getTime();
    hora_reg:number = new Date().getTime();
    llave:string;
  }
  
  