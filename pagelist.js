const fs = require('fs');
const json2md = require("json2md");
const md = [{
  h1: "gr-examples"
}, {
  blockquote: "A collection of instructive examples that introduce the various features in Grimoire.js."
}];
const json = JSON.parse(fs.readFileSync('./pagelist.json', 'utf8'));
fs.readdir('./pages', (err, files) => {
  if (files[0] == '.DS_Store') files.splice(0, 1);
  json.pages = files;
  for (var i = 0; i < files.length; i++) {
    if (json[String(files[i])] === void 0) json[String(files[i])] = "";
    md.push({
      h2: String(files[i])
    })
    md.push({
      p: json[String(files[i])]
    })
    md.push({
      img: {
        title: String(files[i]),
        source: "resource/" + String(files[i]) + ".png"
      }
    })

  }
  fs.writeFileSync('./pagelist.json', JSON.stringify(json, null, '    '));
  fs.writeFileSync('./readme.md', json2md(md));
});