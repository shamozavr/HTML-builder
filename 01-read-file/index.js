const fs = require('node:fs');
const path = require('node:path');

fs.createReadStream(path.join(__dirname, '/text.txt'), 'utf8')
  .on('error', (err) => console.log(err))
  .pipe(process.stdout);
