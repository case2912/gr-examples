const json2md = require("json2md");

console.log(json2md([{
  h1: "gr-examples"
}, {
  blockquote: "A collection of instructive examples that introduce the various features in Grimoire.js."
}, {
  img: {
    title: "Some image",
    source: "https://example.com/some-image.png"
  }
}, {
  h2: "Features"
}]));