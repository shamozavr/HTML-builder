const fs = require('node:fs');
const path = require('node:path');

const { stdout } = process;

fs.readdir(path.join(__dirname, '/secret-folder'), (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    fs.stat(path.join(__dirname, `/secret-folder/${file}`), (err, stats) => {
      if (err) {
        console.error(err);
      }
      let fileSize = stats.size;
      let fileName = `${path.parse(`${file}`).name}`;
      let fileExt = `${path.extname(`${file}`)}`;
      if (stats.isFile()) {
        stdout.write(
          `${fileName} - ${fileExt.slice(1)} - ${(fileSize / 1024).toFixed(
            3,
          )}kb\n`,
        );
      }
    });
  });
});
