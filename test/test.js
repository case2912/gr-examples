'use strict';
const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('config.json')).pages;
module.exports = {
  'saveScreenshot': function(browser) {
    for (var i = 0; i < pages.length; i++) {
      browser
        .url('http://localhost:8080/pages/' + pages[i])
        .pause(100)
        .saveScreenshot('images/' + pages[i] + '.png')
    }
    browser.end();
  }
};