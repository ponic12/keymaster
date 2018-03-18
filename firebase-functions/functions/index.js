var request = require('request');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

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
            var c = moveToHistorico(newVal,rid);
            // var msg = {
            //     emp: newVal.emp_dev,
            //     llave: newVal.llave,
            //     texto: "Se ha devuelto la llave " + newVal.llave,
            //     tipo:"devolucion"
            // };
            // var p = sendMessageToUser(msg);
        }
        else {  // REGISTRO  
            console.log('reg add (Registro): ', newVal);
            var r = llaveDisponible(newVal.llave, false);
            // var msg = {
            //     id:newVal.id,
            //     emp: newVal.emp_reg,
            //     llave: newVal.llave,
            //     texto: "Se ha registrado la llave " + newVal.llave,
            //     tipo:"registro"
            // };
            // var x = sendMessageToUser(msg);
        }
    }
    return true;
});



exports.testEvent = functions.firestore.document('/test/{id}').onWrite(event => {
    const id = event.params.id;
    var info = event.data;
    
    var newVal = {};
    try {
        newVal = info.data();
        console.log('newVal: ', newVal);
    }
    catch (e) {
        console.log('reg delete: ', oldVal);
    }
    if (newVal) {
        var oldDoc = event.data.previous;
        try{
            var oldVal = oldDoc.data();
            if (oldVal) { // UPDATE
                console.log('updating old: ', oldVal);
            }
            else {  // INSERT  
                console.log('item add: ', newVal);
                var d = new Date(newVal.datetime);
                var yyyy = d.getFullYear();
                var mm = d.getMonth();
                var dd = d.getDay();
                var dstr = yyyy && mm && dd;
    
                var key = newVal.user + '_' + dstr;
                console.log('key: ', key);
            }            
        }
        catch(err){
            console.log('OLD VAL: ',err);
        }
    }
});


//////////////////////////////////
// Private functions
//////////////////////////////////
function llaveDisponible(llave, flag) {
    var ref = fs.collection('llaves').doc(llave);
    ref.get().then(doc => {
        var ll = doc.data();
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
    
    var refHist = fs.collection('historico').doc(rid).set(val)
    .then(c => console.log('Registro copiado a Historico'))
    .catch(err => console.log('Error copy to historico:", err'));

    var refReg = fs.collection('registros').doc(rid).delete()
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

