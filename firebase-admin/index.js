const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://keymaster-c4ee3.firebaseio.com"
  });

const db = admin.firestore();

db.collection('llaves').doc('1111111111').set({descripcion:'Mesquita', disponible:true});