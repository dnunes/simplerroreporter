'use strict';
const BaseReporter = require('../BaseReporter')
, bugsnag = require('bugsnag')
;

class Bugsnag extends BaseReporter {
  setup(keys, localOnly, xtraSetup) {
    super.setup('bugsnag', keys, localOnly, xtraSetup);
    if (!localOnly) { bugsnag.register(keys[0], xtraSetup); }
  }

  report(errMsg, errObj, xtraData, force = false) {
    if (this._localOnly && !force) { return false; }
    if (!xtraData) { xtraData = {}; }

    xtraData.errObj = errObj;
    xtraData._context = this.getContext();
    bugsnag.notify(errMsg, xtraData);
    return true;
  }
}

module.exports = Bugsnag;
