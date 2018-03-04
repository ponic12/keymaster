var request = require('request');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const fs = admin.firestore();

exports.registroEvent = functions.firestore.document('registros/{rid}').onWrite(event => {
    const rid = event.params.rid;
    var info = event.data;
    var oldDoc = info.previous;
    var oldVal = oldDoc.data();
    var newVal = {};
    try {
        newVal = info.data();
    }
    catch (e) {
        console.log('reg delete: ', oldVal);
    }
    if (newVal) {
        if (oldVal) { // DEVOLUCION
            console.log('reg update (Devolucion): ', newVal);
            var r = llaveDisponible(newVal.llave, true);
            var c = copyToHistorico(newVal);
            var p = sendMessageToUser(newVal, "Se ha devuelto la llave " + newVal.llave, "devolucion");
            var z = removeRegistro(newVal,rid);
        }
        else {  // REGISTRO  
            console.log('reg add (Registro): ', newVal);
            var r = llaveDisponible(newVal.llave, false);
            var x = sendMessageToUser(newVal, "Se ha registrado la llave " + newVal.llave, "registro");
        }
    }
    return true;
});

//////////////////////////////////
// Private functions
//////////////////////////////////
function llaveDisponible(llave, flag) {
    var ref = fs.collection('llaves').doc(llave);
    ref.get().then(doc => {
        var ll = doc.data();
        console.log('ll: ', ll);
        ll.disponible = flag;
        ref.set(ll).then(c => console.log('Llave disponible:', flag));
    })
        .catch(err => {
            console.log('Error: updating key state:', err);
        });
    return ref;
}
function sendMessageToUser(val, body, type) {
    var target = "/topics/" + val.emp_dev;
    var msg = {
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
            body: body,
            color: "#ffff00",
            icon: "default",
            //tag: "text",
            click_action: "FCM_PLUGIN_ACTIVITY",
            sound: "default"
        },
        data: { type: type }
    };
    //proxy: proxyCfg.url,
    var res = request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=AAAA0_fvtU8:APA91bEH30LTl_1GLw5KtugEb9OJxDvnwWaR0Yrs4aQGCpFFgUu2LqHha1RmJ1DOrW2ufNgYco1ftiT2YyE9vUgQJEf4d_7lRIznkxcXXoBAUEwDuY1sTWXOUiqcdfuXfkMRwK-yN0w5'
        },
        body: JSON.stringify(msg)
    }, 
    function (error, response, body) {
        if (error) {
            console.log(error, response, body);
        }
        else if (response.statusCode >= 400) {
            console.log('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        }
        else {
            console.log('Push OK to : ', msg.to);
        }
    });
    return res;
}
function copyToHistorico(val){
    var refHist = fs.collection('historico').doc(val.id).set(val)
    .then(c => console.log('Registro copiado a Historico'));

    var refReg = fs.collection('registro').doc(val.id).delete()
    .then(c => console.log('Registro borrado'));
    return refReg;
}
function removeRegistro(val, rid){
    var ref = fs.collection('registros').doc(rid);
    ref.delete();
    return ref;
}

