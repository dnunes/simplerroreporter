'use strict';
const BaseReporter = require('../BaseReporter')
, bugsnag = require("bugsnag")
;

class Bugsnag extends BaseReporter {
  setup(keys, localOnly, xtraSetup) {
    super.setup('bugsnag', keys, localOnly, xtraSetup);
    bugsnag.register(keys[0], xtraSetup);
  }

  //set(/*key, value*/) {
  //}
  //get (/*key, value*/) {
  //}

  report(errMsg, errObj/*, xtraData*/) {
    bugsnag.notify(errObj);
  }
}

module.exports = Bugsnag;
