const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname);
const destFolder = path.join(__dirname, '/project-dist');

if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder);
}

console.log(path.join(srcFolder, '/template.html'));
console.log(path.join(destFolder, '/template.html'));

fs.copyFileSync(
  path.join(srcFolder, '/template.html'),
  path.join(destFolder, '/template.html'),
);

const htmlDocument = fs.readFileSync(
  path.join(destFolder, '/template.html'),
  'utf8',
);

const matches = htmlDocument.match(/\{\{([^}]+)\}\}/g);

if (matches) {
  console.log('Найденные значения:');
  matches.forEach((match) => {
    const templateName = match
      .split('')
      .filter((el) => el !== '{' && el !== '}')
      .join('');

    const replacement = fs.readFileSync(
      path.join(srcFolder, `/components/${templateName}.html`),
      'utf8',
    );

    fs.readFile(
      path.join(destFolder, '/template.html'),
      'utf-8',
      (err, contents) => {
        if (err) {
          return console.error(err);
        }

        // Replace string occurrences
        const updated = contents.replace(match, replacement);
        console.log(updated);

        // Write back to file
        fs.writeFile(
          path.join(destFolder, '/template.html'),
          updated,
          'utf-8',
          (err2) => {
            if (err2) {
              console.log(err2);
            }
          },
        );
      },
    );
  });
} else {
  console.log('Значения между задвоенными фигурными скобками не найдены');
}

function mergeStyles() {
  fs.writeFile(path.join(destFolder, '/styles.css'), '', (err) => {
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
      fs.appendFile(path.join(destFolder, '/styles.css'), data, function (err) {
        if (err) throw err;
      });
    }
  });
}

mergeStyles();

function copyDir() {
  const srcFolder = path.join(__dirname, '/assets');
  const destFolder = path.join(__dirname, '/project-dist/assets');
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
