const fs = require('fs');
const data = {};
fs.readdir('./pages', (err, files) => {
  if (files[0] == '.DS_Store') files.splice(0, 1);
  data.pages = files;
  fs.writeFileSync('./config.json', JSON.stringify(data, null, '    '));
});