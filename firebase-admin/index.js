const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://keymaster-c4ee3.firebaseio.com"
  });

const fs = admin.firestore();

var ref = fs.collection('registros').doc('34KzE0Gv7KvEIeOWMDNq');//.set({descripcion:'Mesquita', disponible:true});
ref.get().then(o=>console.log(o));