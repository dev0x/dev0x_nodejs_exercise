/* bookmark.js */
var schemas = require("./schemas.js");
var _ = require("lodash");

var bookmark = function (data) {
  this.data = data;
}

bookmark.prototype.data = {}

bookmark.prototype.get = function (desc) {
  return this.data[desc];
}

bookmark.prototype.getAll = function() {
  return this.data;
}
bookmark.prototype.set = function (desc, value) {
  this.data[desc] = value;
}

bookmark.prototype.sanitize = function(data) {
  data = data || {};
  schema = schemas.bookmark;
  return _.pick(_.default(data,schema), _.keys(schema));
}

module.exports = bookmark;
