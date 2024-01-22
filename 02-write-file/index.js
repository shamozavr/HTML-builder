const fs = require('node:fs');
const path = require('node:path');

const { stdin, stdout } = process;

stdout.write('Type in text to add\n');

stdin.on('data', (data) => {
  fs.appendFile(path.join(__dirname, '/text.txt'), data, (err) => {
    if (err) {
      console.error(err);
    }
  });

  ['SIGINT', 'process.exit()'].forEach((signal) =>
    process.on(signal, () => {
      process.exit(stdout.write('Good luck learning Node.js!'));
    }),
  );
});
