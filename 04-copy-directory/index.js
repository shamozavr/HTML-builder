const fs = require('fs');
const path = require('path');

function copyDir() {
  const srcFolder = path.join(__dirname, '/files');
  const destFolder = path.join(__dirname, '/files-copy');
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder);
  }
  const files = fs.readdirSync(srcFolder);
  files.forEach((file) => {
    const srcPath = path.join(srcFolder, file);
    const destPath = path.join(destFolder, file);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDir();
