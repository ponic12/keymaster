var request = require('request');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.registroEvent = functions.firestore.document('registros/{rid}').onWrite(event => {
    const fs = admin.firestore();
    const rid = event.params.rid;
    var info = event.data;
    var oldDoc = info.previous;
    var oldVal = oldDoc.data();
    var newVal = {};
    try{
        newVal = info.data();
    }
    catch(e){
        console.log('reg delete: ', oldVal);
    }
    if (newVal){
        if (oldVal){
            console.log('reg update (Devolucion): ', newVal);
            var target = "/topics/"+ newVal.empleado;
            var msg = {
                to:target,
                priority:'high',
                // collapseKey :'',
                // restrictedPackageName: "somePackageName",
                // dryRun: true,
                // contentAvailable: true,
                // delayWhileIdle: true,
                timeToLive: 10,
                notification:{
                    title:"KeyMaster",
                    body:"Se ha devuelto la llave "+newVal.llave,
                    color: "#ffff00",
                    icon: "default",
                    //tag: "text",
                    click_action: "FCM_PLUGIN_ACTIVITY",
                    sound: "default"
                },
                data :{type:"devolucion"} 
            };
            console.log('msg: ',msg);
            sendMessageToUser(newVal.empleado, msg);
        }
        else{
            console.log('reg add (Registro): ', newVal);
            var target = "/topics/"+ newVal.empleado;
            var msg = {
                to:target,
                priority:'high',
                // collapseKey :'',
                // restrictedPackageName: "somePackageName",
                // dryRun: true,
                // contentAvailable: true,
                // delayWhileIdle: true,
                timeToLive: 10,
                notification:{
                    title:"KeyMaster",
                    body:"Se ha devuelto la llave "+newVal.llave,
                    color: "#ffff00",
                    icon: "default",
                    //tag: "text",
                    click_action: "FCM_PLUGIN_ACTIVITY",
                    sound: "default"
                },
                data : {type:"Registro"}
            };
            console.log('msg: ',msg);
            sendMessageToUser(newVal.empleado, msg);
            //Notify to FCM --> topic = newVal.empleado
        }
    }
});

//////////////////////////////////
// FCM
//////////////////////////////////
function sendMessageToUser(deviceId, message) {	
    //proxy: proxyCfg.url,
    request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :' application/json',
        'Authorization': 'key=AAAA0_fvtU8:APA91bEH30LTl_1GLw5KtugEb9OJxDvnwWaR0Yrs4aQGCpFFgUu2LqHha1RmJ1DOrW2ufNgYco1ftiT2YyE9vUgQJEf4d_7lRIznkxcXXoBAUEwDuY1sTWXOUiqcdfuXfkMRwK-yN0w5'
      },
      body: JSON.stringify(message)
    }, function(error, response, body) {
      if (error) { 
        console.error(error, response, body); 
      }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
      }
      else {
        console.log('Done!')
      }
    });
  }

