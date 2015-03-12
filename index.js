var dateformat = require('dateformat');
var util = require('util');

module.exports = Override;

var fns =  [ 'log',
             'info',
             'warn',
             'error',
             'trace' ];

var defaultFormat = "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'";

function Override(obj, format) {
  if (obj._ctl_)
    return clear;

  if ( 'string' === typeof obj) {
    format = obj;
    obj = console;
  }

  if (!format)
    format = defaultFormat;

  var originals = fns.reduce(function(acc, name) {
    acc[name] = obj[name];
    return acc;
  }, {});

  obj._ctl_ = true;
  fns.forEach(iterator);

  function iterator(name) {
    obj[name] = function wrapper() {
      var args = Array.prototype.slice.apply(arguments);
      var msg = util.format.apply(util, args);
      var date = dateformat(new Date(), format);
      originals[name]([date, msg].join(' '));
    };
  }

  return clear;

  function clear() {
    if (!obj._ctl_)
      return;

    fns.forEach(cleanup);
    function cleanup(name, idx) {
      obj[name] = originals[name];
    }

    delete obj._ctl_;
  }
}
