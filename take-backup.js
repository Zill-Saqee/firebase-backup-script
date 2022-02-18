const fs = require('fs');
const { backups } = require('firestore-export-import');

module.exports = async function takeBackupOfCollections() {
    // Get a list of all collections from firebase
    const collectionsBackup = await backups([], {});
    const collections = Object.keys(collectionsBackup);

    // Run a for loop on all of the collections and get all data
    for (const key in collectionsBackup) {
        if (Object.hasOwnProperty.call(collectionsBackup, key)) {
            const data = collectionsBackup[key];
            const json = JSON.stringify(data);
            // Save all of the collections files in files/<collection_name>.json
            fs.writeFileSync(__dirname + '/files/' + `${key}.json`, json, 'utf8');
            console.log(`${key} collection backup done`);
        }
    };

    return collections;
}
