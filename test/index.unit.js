'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export npwcore-lib', function() {
    var npwcore = require('../');
    should.exist(npwcore.lib);
    should.exist(npwcore.lib.Transaction);
    should.exist(npwcore.lib.Block);
  });
});
