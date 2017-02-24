'use strict';

let _instance = null;

module.exports = {
  'setup': function (engine, keys, localOnly, xtraSetup) {
    if (_instance) {
      //throw new Error('Error Reporter already set up!');
      return _instance;
    }

    let EngineRef = require('./reporters/'+ engine);
    _instance = new EngineRef();
    _instance.setup(keys, localOnly, xtraSetup);
    return _instance;
  },

  'set': function (key, value) {
    if (!_instance) {
      throw new Error('You must call "setup" first!');
    }
    return _instance.set(key, value);
  },
  'get': function (key, value) {
    if (!_instance) {
      throw new Error('You must call "setup" first!');
    }
    return _instance.get(key, value);
  },

  'notify': function (errMsg, errObj/*, xtraData*/) {
    if (!_instance) {
      throw new Error('You must call "setup" first!');
    }
    return _instance.notify(errMsg, errObj);
  }
};