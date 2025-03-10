const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const mongoURI = process.env.MONGO_URL;
const dbName = process.env.DB_NAME
const backupDir = "./backups";

function restoreLatestBackup() {
  fs.readdir(backupDir, (err, files) => {
    if (err) {
      console.error("Failed to list backup files:", err);
      return;
    }
    const backupFiles = files
      .filter((file) => file.endsWith(".gz"))
      .sort((a, b) => {
        return (
          fs.statSync(path.join(backupDir, b)).mtime.getTime() -
          fs.statSync(path.join(backupDir, a)).mtime.getTime()
        );
      });

    if (backupFiles.length === 0) {
      console.error("No backup files found.");
      return;
    }

    const latestBackup = backupFiles[0];
    const backupPath = path.join(backupDir, latestBackup);

    const command = `mongorestore --uri="${mongoURI}/${dbName}" --gzip --archive=${backupPath}`;

    console.log(command)
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Restore failed: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Restore stderr: ${stderr}`);
        return;
      }
      console.log(`Restore successful: ${latestBackup}`);
    });
  });
}

module.exports = restoreLatestBackup
