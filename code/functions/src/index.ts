import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as request from 'request'

//import * as moment from 'moment'

admin.initializeApp(functions.config().firebase)

export const registroEvent = functions.database.ref('registros/{rid}').onWrite((event, ctx) => {
   const after = event.after.val()
   const before = event.before.val()
   const rid = ctx.params.rid
   
   if (after){
      if (before){ // DEVOLUCION
         console.log('reg update (Devolucion): ', after);
         const r = llaveDisponible(after.llave, true);
         const c = moveToHistorico(after,rid);
      }
      else { // REGISTRO
         console.log('reg add (Registro): ', after);
         const r = llaveDisponible(after.llave, false);
      }
   }
   return true
})



//////////////////////////////////
// Private functions
//////////////////////////////////
function llaveDisponible(llave, flag) {
   const ref = admin.firestore().collection('llaves').doc(llave);
   ref.get()
   .then(doc => {
       const ll = doc.data();
       ll.disponible = flag;
       ref.set(ll).then(c => console.log('Llave disponible:', flag));
   })
   .catch(err => {
       console.log('Error: updating key state:', err);
   });
   return ref;
}
function moveToHistorico(val,rid){
   console.log('copy to historico: ', val);
   console.log('registro ID: ', rid);
   
   const refHist = admin.firestore().collection('historico').doc(rid).set(val)
   .then(c => console.log('Registro copiado a Historico'))
   .catch(err => console.log('Error copy to historico:", err'));

   const refReg = admin.firestore().collection('registros').doc(rid).delete()
   .then(c => console.log('Registro borrado'))
   .catch(err => console.log('Error deleting reg: ', err));

   return refReg;
}
function sendMessageToUser(msg) {
   var target = "/topics/" + msg.emp;
   var payload = {
       to: target,
       priority: 'high',
       // collapseKey :'',
       // restrictedPackageName: "somePackageName",
       // dryRun: true,
       // contentAvailable: true,
       // delayWhileIdle: true,
       timeToLive: 10,
       notification: {
           title: "KeyMaster",
           body: msg.texto,
           color: "#ffff00",
           icon: "default",
           //tag: "text",
           click_action: "FCM_PLUGIN_ACTIVITY",
           sound: "default"
       },
       data: { type: msg.tipo, llave: msg.llave, idReg: msg.id }
   };
   //proxy: proxyCfg.url,
   var res = request({
       url: 'https://fcm.googleapis.com/fcm/send',
       method: 'POST',
       headers: {
           'Content-Type': ' application/json',
           'Authorization': 'key=AAAA0_fvtU8:APA91bEH30LTl_1GLw5KtugEb9OJxDvnwWaR0Yrs4aQGCpFFgUu2LqHha1RmJ1DOrW2ufNgYco1ftiT2YyE9vUgQJEf4d_7lRIznkxcXXoBAUEwDuY1sTWXOUiqcdfuXfkMRwK-yN0w5'
       },
       body: JSON.stringify(payload)
   }, 
   function (error, response, body) {
       if (error) {
           console.log(error, response, body);
       }
       else if (response.statusCode >= 400) {
           console.log('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
       }
       else {
           console.log('Push OK to : ', target);
       }
   });
   return res;
}
