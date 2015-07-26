var assert = require('assert');
var Field = require('../');

describe('BitField.js', function() {
  var f;
  beforeEach(function() {
    f = new Field(1024);
  });

  it('should set and check bits', function() {
    f.set(257);
    assert(!f.set(257));
    assert(f.check(257));

    f.set(13);
    assert(!f.set(257));
    assert(f.check(257));

    f.set(258);
    f.clear(257);
    assert(f.check(13));
    assert(!f.check(257));
    assert(f.check(258));
  });
});
