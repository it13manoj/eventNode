const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

exports.exportFullDatabase = (req, res) => {

  const DB_NAME = process.env.DATABASE;
  const DB_USER = process.env.USER_NAME;
  const DB_PASS = process.env.PASSWORD;

  const backupDir = path.join(__dirname, "backup");

  // create folder if not exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const fileName = `backup_${Date.now()}.sql`;
  const filePath = path.join(backupDir, fileName);

  const command =
    `mysqldump -u ${DB_USER} -p'${DB_PASS}' "${DB_NAME}" --routines --triggers --events > "${filePath}"`;

  console.log(command);

  exec(command, (error, stdout, stderr) => {

    if (error) {
      console.log("ERROR:", error);
      console.log("STDERR:", stderr);

      return res.status(500).json({
        success: false,
        error: error.message,
        stderr
      });
    }

    console.log("✅ Full database exported:", filePath);

    res.download(filePath);
  });
};