'use strict';

let _instance = null;

module.exports = {
  'setup': function (engine, keys, localOnly, xtraSetup = {}) {
    if (_instance) { return _instance; }

    let EngineRef;
    try {
      EngineRef = require('./reporters/'+ engine);
    } catch (ex) {
      throw new Error('Couldn\'t load error reporter engine "'+ engine +'"!');
    }
    _instance = new EngineRef();
    _instance.setup(keys, localOnly, xtraSetup);
    return _instance;
  },

  'addContext': function (...args) {
    if (!_instance) { throw new Error('You must call "setup" first!'); }
    _instance.addContext(...args);
  },
  'getContext': function () {
    if (!_instance) { throw new Error('You must call "setup" first!'); }
    _instance.getContext();
  },
  'notify': function (errMsg, errObj, xtraData) {
    if (!_instance) { throw new Error('You must call "setup" first!'); }
    return _instance.notify(errMsg, errObj, xtraData);
  },
  'report': function (errMsg, errObj, xtraData, force = false) {
    if (!_instance) { throw new Error('You must call "setup" first!'); }
    return _instance.report(errMsg, errObj, xtraData, force);
  }
};
