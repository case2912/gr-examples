var fs = require('fs');
fs.readdir('./pages', (err, files) => {
  let data = {
    "pages": null
  }
  data.pages = files;
  fs.writeFileSync('./pagelist.json', JSON.stringify(data, null, '    '));
});