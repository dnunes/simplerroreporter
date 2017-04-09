'use strict';

class BaseReporter {
  setup(engine, keys, localOnly, xtraSetup) {
    this._keys = keys;
    this._localOnly = localOnly;
    this._xtraSetup = xtraSetup;
  }

  report (/*errMsg, errObj*/) {
    throw new Error('Not implementent on this engine!');
  }
  set(/*key, value*/) {
    throw new Error('Not implementent on this engine!');
  }
  get (/*key, value*/) {
    throw new Error('Not implementent on this engine!');
  }

  notify(errMsg, errObj/*, xtraData*/) {
    console.log('#### ERROR! ####');
    console.log(errMsg);
    if (errObj) {
      if (this._localOnly) {
        console.log('--- LOCAL ONLY NOTIFICATION--SKIPPING REPORT API CALL ---');
        console.log(errObj);
      } else {
        this.report(errMsg, errObj);
      }
    }
  }
}

module.exports = BaseReporter;
