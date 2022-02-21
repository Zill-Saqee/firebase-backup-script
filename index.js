const { admin } = require("firestore-export-import");
const { initializeFirebaseAdminSdkForSourceProject, initializeFirebaseAdminSdkForDestinationProject } = require("./initialize-admin-sdks");
const restoreBackup = require("./restore-backup");
const takeBackup = require("./take-backup");

async function runBackupScript() {
    try {
        console.log("Initializing admin sdk for source project");
        await initializeFirebaseAdminSdkForSourceProject();

        console.log("Starting backup process");
        const collections = await takeBackup();

        // Deleting initialized source app  
        await admin.app().delete()

        console.log("Initializing admin sdk for destination project");
        await initializeFirebaseAdminSdkForDestinationProject();

        console.log("Starting restore process");
        await restoreBackup(collections);
        console.log("Completed successfully");

    } catch (error) {
        console.log(error);
    }
}

runBackupScript();
