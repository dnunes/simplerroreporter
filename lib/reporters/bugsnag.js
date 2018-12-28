'use strict';
const BaseReporter = require('../BaseReporter')
, bugsnag = require('@bugsnag/js')
;

class Bugsnag extends BaseReporter {
  setup(keys, localOnly, xtraSetup) {
    if (!xtraSetup) { xtraSetup = {}; }
    super.setup('bugsnag', keys, localOnly, xtraSetup);

    if (!localOnly) {
      xtraSetup.apiKey = keys[0];
      xtraSetup.beforeSend = (report) => {
        if (report.metaData._groupingHash) {
          report.groupingHash = report.metaData._groupingHash;
          report.removeMetaData('_groupingHash');
        }
      };
      this._bugsnag = bugsnag(xtraSetup);
    }
  }

  report(errObj, metaData, force = false) {
    if (this._localOnly && !force) { return false; }
    if (!metaData) { metaData = {}; }
    metaData.context = this.getContext();
    let xtraInfo = {'metaData': metaData};

    this._bugsnag.notify(errObj, xtraInfo);
    return true;
  }
}

module.exports = Bugsnag;
