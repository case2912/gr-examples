'use strict';

module.exports = {

  'Contents test': function(browser) {
    browser
      .url('http://localhost:9100/')
      .pause(10000)
      .assert.title('gr-examples')
      .end();
  }
};