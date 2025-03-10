const moment = require("moment");
const fs = require("fs-extra");
const { exec } = require("child_process");
var cron = require("node-cron");
const { ejsReader } = require("../utils/readers");
const sendMail = require("./emailService");

const mongoURI = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const backupDir = "./backups";
const maxBackups = 4;

const sendErrMail=async(err)=>{
    const html = await ejsReader("backupError.ejs",{error: err, timestamp: new Date().toISOString()})
    const res = await sendMail(process.env.DEV_MAIL,'MongoDb Backup Error',html)
    console.log(res)
}

async function backupDatabase() {
  const timestamp = moment().format("YYYY-MM-DD-HH-mm-ss");
  const backupFilename = `${dbName}-${timestamp}.gz`;
  const backupPath = `${backupDir}/${backupFilename}`;
  try {
    await fs.ensureDir(backupDir);

    const command = `mongodump --uri="${mongoURI}" --db=${dbName} --archive=${backupPath} --gzip`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        sendErrMail(error)
        console.error(`Backup failed: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Backup stderr: ${stderr}`);
        return;
      }
      console.log(`Backup successful: ${backupFilename}`);

      fs.readdir(backupDir, (err, files) => {
        if (err) throw err;
        if (files.length > maxBackups) {
          files.sort((a, b) => {
            return (
              fs.statSync(`${backupDir}/${a}`).mtime.getTime() -
              fs.statSync(`${backupDir}/${b}`).mtime.getTime()
            );
          });

          const oldestFile = files[0];
          fs.unlink(`${backupDir}/${oldestFile}`, (err) => {
            if (err) throw err;
            console.log(`Deleted old backup: ${oldestFile}`);
          });
        }
      });
    });
  } catch (err) {
    sendErrMail(err)
    console.error("Backup process encountered an error:", err);
  }
}

const backupJob = cron.schedule("0 0 */2 * *", () => {
    backupDatabase()
  },{
    scheduled:false
});
  
module.exports = backupJob
