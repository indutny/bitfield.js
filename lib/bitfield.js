'use strict';

function Field(size) {
  this.field = new Array(Math.ceil(size / 32));
  for (var i = 0; i < this.field.length; i++)
    this.field[i] = 0;
}
module.exports = Field;

Field.create = function create(size) {
  return new Field(size);
};

Field.prototype.grow = function grow(size) {
  var length = Math.ceil(size / 32);
  while (this.field.length < length)
    this.field.push(0);
};

Field.prototype.set = function set(index) {
  var i = index >>> 5;
  var j = index & 0x1f;

  var bit = 1 << j;
  if ((this.field[i] & bit) !== 0)
    return false;

  this.field[i] |= bit;
  return true;
};

Field.prototype.check = function check(index) {
  var i = index >>> 5;
  var j = index & 0x1f;

  var bit = 1 << j;
  return (this.field[i] & bit) !== 0;
};

Field.prototype.clear = function clear(index) {
  var i = index >>> 5;
  var j = index & 0x1f;

  var bit = 1 << j;
  this.field[i] &= ~bit;
};

Field.prototype.wipe = function wipe() {
  for (var i = 0; i < this.field.length; i++)
    this.field[i] = 0;
};

Field.prototype.or = function or(other) {
  var min = Math.min(this.field.length, other.field.length);
  for (var i = 0; i < min; i++)
    this.field[i] |= other.field[i];

  while (this.field.length < other.field.length)
    this.field.push(other.field[this.field.length]);
};
