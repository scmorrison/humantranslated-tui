'use strict'

var colors = require("colors");
var pkg = require("../package.json");

exports.print = function(options) {
  if (options && options.message && typeof options.message === 'string') {
    return console.log("[", "humantranslated".white, "]", options.message.toString().cyan);
  } else {
    throw new Error('no message defined to print!');
  }
};
