'use strict';

var createError = require('errno').create;

var NPWNodeError = createError('NPWNodeError');

var RPCError = createError('RPCError', NPWNodeError);

module.exports = {
  Error: NPWNodeError,
  RPCError: RPCError
};
