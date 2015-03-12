var assert = require('chai').assert;

var fns =  [ 'log',
             'info',
             'warn',
             'error',
             'trace' ];

 function datify() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return [ day, month, year].join('/');
 }

describe('Override', function() {
  var clear;

  fns.forEach(contextify);
  function contextify(name) {
    var captured;
    var subject = {};
    subject[name] = function(value) {
      captured = value;
    };

    it(name + ' with date format', function() {
      subject[name] = function(value) { captured = value; };
      clear = require('../')(subject, 'dd/m/yyyy');
      var expected = datify();
      var regex = new RegExp(expected);

      subject[name]('my_log');
      assert.match(captured, regex);
    });
  }


  it('do not override previous definition', function() {
    var captured;
    var subject = {};
    subject.log = function log(value) { captured = value; };
    clear = require('../')(subject, 'dd/m/yyyy');
    require('../')(subject, 'HH:MM');

    subject.log('another_log');
    var regex = new RegExp(datify());
    assert.match(captured, regex);
    assert.match(captured, /another_log/);
    clear();
  });

  it('allow override after clear', function(){
    var subject = {};
    subject.warn = function warn(value) { captured = value; };
    clear = require('../')(subject, 'dd');
    clear();
    require('../')(subject, 'dd/m/yyyy');
    subject.warn('clear');
    var regex = new RegExp(datify());
    assert.match(captured, regex);
    clear();
  });

  it('without object defaults to console', function() {
    var captured;
    var original = console.warn;
    console.warn = function(value) {
      captured = value;
    };

    clear = require('../')('dd/m/yyyy');
    var regex = new RegExp(datify());

    console.warn('yldio');
    assert.match(captured, /yldio/);
    assert.match(captured, regex);
    clear();
    console.warn = original;
  });

});
