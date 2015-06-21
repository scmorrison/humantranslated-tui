'use strict'

var assert = require("assert");
var cli = require("../lib/cli");

suite("cli", function() {
  return suite("print", function() {
    return test("should throw an error when empty options", function() {
      return assert.throws((function() {
        return cli.print();
      }), Error);
    });
  });
});
