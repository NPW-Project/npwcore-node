'use strict';

var _ = require('lodash');
var constants = require('./constants');
var BN = require('bn.js');

var utils = {};

utils.isHeight = function(blockArg) {
  if (!blockArg && blockArg !== 0) {
    return false;
  }
  return _.isNumber(blockArg) || (blockArg.length < 40 && /^[0-9]+$/.test(blockArg));
};

//start
utils.isAbsolutePath = require('path').isAbsolute;
if (!utils.isAbsolutePath) {
  utils.isAbsolutePath = require('path-is-absolute');
}

//main
utils.parseParamsWithJSON = function(paramsArg) {
  var params = paramsArg.map(function(paramArg) {
    var param;
    try {
      param = JSON.parse(paramArg);
    } catch(err) {
      param = paramArg;
    }
    return param;
  });
  return params;
};

utils.getTerminalKey = function(startKey) {
  if (!startKey || !Buffer.isBuffer(startKey)) {
    return;
  }
  var bn = new BN(startKey);
  var endBN = bn.iaddn(1);
  return endBN.toBuffer();
};

utils.diffTime = function(time) {
  var diff = process.hrtime(time);
  return (diff[0] * 1E9 + diff[1])/(1E9 * 1.0);
};

utils.sendError = function(err, res) {
  if (err.statusCode)  {
    res.status(err.statusCode).send(err.message);
  } else {
    console.error(err.stack);
    res.status(503).send(err.message);
  }
};

utils.encodeTip = function(tip, name) {
  var key = Buffer.concat([ constants.DB_PREFIX,
    new Buffer('tip-' + name, 'utf8') ]);

  var heightBuf = new Buffer(4);
  heightBuf.writeUInt32BE(tip.height);

  var value = Buffer.concat([ heightBuf, new Buffer(tip.hash, 'hex') ]);
  return { key: key, value: value };

};

utils.SimpleMap = function SimpleMap() {
  var object = {};
  var array = [];

  this.size = 0;
  this.length = 0;

  this.hasNullItems = function() {
    return array.length !== _.compact(array).length;
  };

  this.get = function (key) {
    return array[object[key]];
  };

  this.set = function (key, value, pos) {

    if (pos >= 0) {
      object[key] = pos;
      array[pos] = value;
    } else {
      object[key] = array.length;
      array.push(value);
    }

    this.size = array.length;
    this.length = array.length;
  };

  this.getIndex = function (index) {
    return array[index];
  };

  this.getLastIndex = function () {
    return array[array.length - 1];
  };
};

utils.IndeterminateProgressBar = function IndeterminateProgressBar() {

  var states = ['|', '/', '-', '\\'];

  this.state = 0;

  this.tick = function() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(states[this.state++ % states.length]);
  };
};

utils.convertMillisecondsToHumanReadable = function(ms) {
  var ret = '';

  var minutes;
  var seconds;

  if (!ms && ms !== 0) {
    return 'invalid number of ms.';
  }

  if (ms >= 60000) {
    minutes = Math.floor(ms / 60000);
    ms = ms % 60000;
  }

  if (ms >= 1000) {
    seconds = Math.floor(ms / 1000);
    ms = ms % 1000;
  }

  if (minutes) {
    ret = minutes + ' minute(s). ';
  }

  if (seconds) {
    ret += seconds + ' second(s). ';
  }

  ret += ms + ' millisecond(s).';
  return ret;

};

utils.dedupByTxid = function(list) {
  var used = [];
  return _.compact(_.flattenDeep(list)).filter(function(item) {
    var pass = used.indexOf(item.id) === -1;
    used.push(item.id);
    return pass;
  });
};

utils.orderByConfirmations = function(list) {
  // newly confirmed first
  return _.sortBy(list, function(item) {
    return item.confirmations;
  });
};

// items is output or input
utils.getAddress = function(item, network) {
  var address = item.script.toAddress(network);
  if (!address) {
    return;
  }
  return address.toString();
};

utils.revHex = function revHex(buf) {
  const str = buf.toString('hex');
  let out = '';
  for (let i = str.length - 2; i >= 0; i -= 2)
    out += str[i] + str[i + 1];

  return out;
};

/**
 * Convert a compact number to a big number.
 * Used for `block.bits` -> `target` conversion.
 * @param {Number} compact
 * @returns {BN}
 */
utils.fromCompact = function fromCompact(compact) {
  if (compact === 0)
    return new BN(0);

  const exponent = compact >>> 24;
  const negative = (compact >>> 23) & 1;

  let mantissa = compact & 0x7fffff;
  let num;

  if (exponent <= 3) {
    mantissa >>>= 8 * (3 - exponent);
    num = new BN(mantissa);
  } else {
    num = new BN(mantissa);
    num.iushln(8 * (exponent - 3));
  }

  if (negative)
    num.ineg();

  return num;
};

module.exports = utils;
