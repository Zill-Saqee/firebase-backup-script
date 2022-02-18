const { initializeApp } = require('firestore-export-import');

const sourceProjectServiceAccountKey = require('./sourceProjectServiceAccountKey.json');
const destinationProjectServiceAccountKey = require('./destinationProjectServiceAccountKey.json');

module.exports.initializeFirebaseAdminSdkForSourceProject = async function () {
   return await initializeApp(sourceProjectServiceAccountKey);
}
module.exports.initializeFirebaseAdminSdkForDestinationProject = async function () {
    return await initializeApp(destinationProjectServiceAccountKey);
}