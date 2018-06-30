'use strict';

let _contextLines = 50;
class BaseReporter {
  setup(engine, keys, localOnly, xtraSetup) {
    this._keys = keys;
    this._localOnly = localOnly;
    this._xtraSetup = xtraSetup;

    this._context = [];
  }

  addContext(msg) {
    this._context.push(msg);
    this._context = this._context.slice(-_contextLines);
  }
  getContext() { return this._context.join('\n'); }

  notify(errMsg, errObj, xtraData) {
    console.log('#### ERROR! ####');
    console.log(errMsg);
    if (errObj) { console.log(errObj); }
    if (xtraData) {
      console.log('#### XtraData ####');
      console.log(xtraData);
    }
    console.log('#### ------ ####');
    if (!xtraData) { xtraData = {}; }

    if (!this._localOnly) {
      let err = new Error(errMsg);
      xtraData._err = errObj;
      this.report(err, xtraData);
    }
  }

  report(/*errObj, xtraData*/) {
    throw new Error('"Report" not implemented in default reporter!');
  }
}

module.exports = BaseReporter;
