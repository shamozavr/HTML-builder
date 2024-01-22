const fs = require('fs');
const path = require('path');

function mergeStyles() {
  const destFolder = path.join(__dirname, '/project-dist');
  console.log(destFolder);
  fs.writeFile(path.join(__dirname, '/project-dist/bundle.css'), '', (err) => {
    if (err) {
      console.error(err);
    }
  });
  const stylesFolder = path.join(__dirname, '/styles');
  const stylesFiles = fs.readdirSync(stylesFolder);
  console.log(stylesFiles);
  stylesFiles.forEach((file) => {
    const data = fs.readFileSync(path.join(stylesFolder, `/${file}`));
    if (path.extname(file) === '.css') {
      fs.appendFile(
        path.join(__dirname, '/project-dist/bundle.css'),
        data,
        function (err) {
          if (err) throw err;
        },
      );
    }
  });
}

mergeStyles();
