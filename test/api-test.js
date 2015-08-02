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

  it('should wipe field', function() {
    f.set(1);
    f.set(3);
    f.set(46);
    f.set(1024);

    f.wipe();

    assert(!f.check(1));
    assert(!f.check(3));
    assert(!f.check(46));
    assert(!f.check(1024));
  });

  it('should `or` with other field', function() {
    f.set(1);
    f.set(3);

    var other = new Field(2048);
    other.set(2000);
    other.set(7);
    other.set(64);

    f.or(other);

    assert(f.check(1));
    assert(f.check(3));
    assert(f.check(7));
    assert(f.check(64));
    assert(f.check(2000));
  });
});
