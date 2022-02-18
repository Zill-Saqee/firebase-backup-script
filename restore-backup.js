const fs = require('fs');
const { restore } = require("firestore-export-import");

module.exports = async function restoreFromBackup(collections) {
    try {
        console.log(collections);
        await Promise.all(collections.map(async name => {
            let backupData = fs.readFileSync(__dirname + '/files/' + `${name}.json`, "utf8");
            backupData = JSON.parse(backupData);
            await restore({ [name]: backupData });
            console.log(`collection ${name} restored to destination project`);
        }));
    } catch (error) {
        console.log(error);
    }
}