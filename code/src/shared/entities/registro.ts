export class Registro {
  id?: string;
  llave: string;
  hora_reg: number = new Date().getTime();
  emp_reg: string;
  hora_dev?: number = new Date().getTime();
  emp_dev?: string;
}

