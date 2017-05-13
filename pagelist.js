var fs = require('fs');
const json = JSON.parse(fs.readFileSync('./pagelist.json', 'utf8'));
fs.readdir('./pages', (err, files) => {
  if (files[0] == '.DS_Store') files.splice(0, 1);
  json.pages = files;
  for (var i = 0; i < files.length; i++) {
    if (json[String(files[i])] === void 0) json[String(files[i])] = "";
  }
  fs.writeFileSync('./pagelist.json', JSON.stringify(json, null, '    '));
  console.log("update pagelist.json!");
});