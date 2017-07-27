'use strict';
const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('config.json')).pages;

function isExistFile(file) {
  try {
    fs.statSync(file);
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
  }
}
module.exports = {
  'saveScreenshot': function(browser) {
    for (var i = 0; i < pages.length; i++) {
      const path = '_images/' + pages[i] + '.png'
      if (!isExistFile(path)) {
        browser
          .url('http://localhost:8080/pages/' + pages[i])
          .pause(100)
          .saveScreenshot(path)
      }
    }
    browser.end();
  }
};