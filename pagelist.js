const fs = require('fs');
const json2md = require("json2md");
const data = {};
const md = [{
    h1: 'gr-examples'
  },
  {
    blockquote: "A collection of instructive examples that introduce the various features in Grimoire.js"
  }
]
fs.readdir('./pages', (err, files) => {
  if (files[0] == '.DS_Store') files.splice(0, 1);
  data.pages = files;
  files.forEach((e, k) => {
    md.push({
      h2: e
    })
    md.push({
      img: {
        title: e,
        source: './images/' + e + '.png'
      }
    })
  })
  fs.writeFileSync('./config.json', JSON.stringify(data, null, '    '));
  fs.writeFileSync('./README.md', json2md(md));
});