const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.movementEvent = functions.firestore.document('registros/{rid}').onWrite(event => {
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
            console.log('reg update: ', newVal);
        }
        else{
            console.log('reg add: ', newVal);
            //Notify to FCM --> topic = newVal.empleado
        }
    }
});

