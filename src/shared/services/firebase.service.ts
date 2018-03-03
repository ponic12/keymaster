import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Empleado } from '../entities/empleado';
import { Registro } from '../entities/registro';
import { Llave } from '../entities/llave';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
    registrosRef: AngularFirestoreCollection<Registro>;
    registros$: Observable<any[]>;

    llavesRef: AngularFirestoreCollection<Llave>;
    llaves$: Observable<Llave[]>;

    constructor(private afs: AngularFirestore) {
        console.log('FirebaseService constructor');
    }

    getLlavesDisponibles(flag: boolean): Observable<any[]> {
        this.llavesRef = this.afs.collection('llaves',
            ref => ref.where('disponible', '==', flag).orderBy('nombre', 'asc'));
        this.llaves$ = this.llavesRef.valueChanges();
        return this.llaves$;
    }
    getRegistrosByFecha(fecha: number, sortName, sortDir): Observable<any[]> {
        // afs.collection('items', ref => {
        //     let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        //     if (size) { query = query.where('size', '==', size) };
        //     if (color) { query = query.where('color', '==', color) };
        //     return query;
        //   }).valueChanges()

        this.registrosRef = this.afs.collection<any>('registros',
            ref => ref.orderBy(sortName, sortDir));
        this.registros$ = this.registrosRef.snapshotChanges()
            .map(actions => {
                return actions.map(action => {
                    const d = action.payload.doc;
                    const item = d.data();
                    item.id = d.id;
                    return item;
                });
            });
        return this.registros$;
    }
    getRegistroByLlave(llave: string): Observable<any[]> {
        this.registrosRef = this.afs.collection<any>('registros',
            ref => ref.where('llave', '==', llave).where('emp_dev', '==', ''));
        this.registros$ = this.registrosRef.snapshotChanges()
            .map(actions => {
                return actions.map(action => {
                    const d = action.payload.doc;
                    const item = d.data();
                    item.id = d.id;
                    return item;
                });
            });
        return this.registros$;
    }
    getRegistroByEmp(emp: string, llave: string): Observable<any[]> {
        this.registrosRef = this.afs.collection<any>('registros',
            ref => ref.where('emp_reg', '==', emp).where('llave', '==', llave));
        this.registros$ = this.registrosRef.snapshotChanges()
            .map(actions => {
                return actions.map(action => {
                    const d = action.payload.doc;
                    const item = d.data();
                    item.id = d.id;
                    return item;
                });
            });
        return this.registros$;
    }

    register(emp: Empleado): Promise<any> {
        var reg = new Registro();
        reg.llave = emp.llave;
        reg.emp_reg = emp.legajo;
        reg.hora_reg = new Date().getTime();
        this.registrosRef = this.afs.collection<Registro>('registros');
        var p = this.registrosRef.add({ ...reg });
        return p;
    }
    unregister(emp: Empleado): Promise<any> {
        var regRef = this.getRegistroByLlave(emp.llave);
        var reg = new Registro();
        reg.emp_dev = emp.legajo;
        reg.hora_dev = new Date().getTime();

        var u = this.afs.doc<any>('registros/' + reg.id);
        var p = u.update(Object.assign({}, reg))
            .then(function () {
                console.log("Update reg ok");
            })
            .catch(function (error) {
                console.error("Error Updating reg: ", error);
            });
        return p;
    }
    transfer(o: Empleado, t: Empleado): Promise<any> {
        var p = this.unregister(o)
            .then(function () {
                var pr = this.register(t);
            })
        return p;
    }

    // deleteRegistro(o):void {
    //     this.registrosRef.doc(o.id).delete()
    //     .then(function() {
    //         console.log("Delete reg ok");
    //     })
    //     .catch(function(error) {
    //         console.error("Error Deleting reg: ", error);
    //     });
    // }
}