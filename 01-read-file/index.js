const fs = require('node:fs');
const path = require('node:path');
fs.readFile(path.join(__dirname, '/text.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
