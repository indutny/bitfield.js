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

Field.prototype.set = function set(index) {
  var i = Math.floor(index / 32);
  var j = index % 32;

  var bit = 1 << j;
  if ((this.field[i] & bit) !== 0)
    return false;

  this.field[i] |= bit;
  return true;
};

Field.prototype.check = function check(index) {
  var i = Math.floor(index / 32);
  var j = index % 32;

  var bit = 1 << j;
  return (this.field[i] & bit) !== 0;
};

Field.prototype.clear = function clear(index) {
  var i = Math.floor(index / 32);
  var j = index % 32;

  var bit = 1 << j;
  this.field[i] &= ~bit;
};
