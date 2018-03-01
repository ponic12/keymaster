import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FirebaseService {
    registrosRef: AngularFirestoreCollection<any>;
    registros$: Observable<any[]>;

        
    constructor(private afs:AngularFirestore){
        console.log('FirebaseService constructor');
    }

    getRegistrosByFecha(fecha:number, sortName, sortDir):Observable<any[]>{
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
    
    addRegistro(o:any):Promise<any>{
        return this.registrosRef.add({...o});
    }
    
    updateRegistro(o):void {
        var u = this.afs.doc<any>('registros/'+o.id);
        u.update(Object.assign({}, o))
        .then(function() {
            console.log("Update reg ok");
        })
        .catch(function(error) {
            console.error("Error Updating reg: ", error);
        });
    }
    
    deleteRegistro(o):void {
        this.registrosRef.doc(o.id).delete()
        .then(function() {
            console.log("Delete reg ok");
        })
        .catch(function(error) {
            console.error("Error Deleting reg: ", error);
        });
    }
}