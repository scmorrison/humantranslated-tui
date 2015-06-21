'use strict'

var program = require("commander");
var colors = require("colors");
var pkg = require("../package.json");
var cli = require("./cli");

program.version(pkg.version).option("-m, --message [message]", "set message to be printed.");

program.on("--help", function() {
  console.log("  Examples:");
  console.log("");
  console.log("    $ " + pkg.name + " config");
  console.log("    $ " + pkg.name + " stories list");
  console.log("    $ " + pkg.name + " stories add story.json");
  console.log("    $ " + pkg.name + " stories remove --story-id STOREYID");
  console.log("    $ " + pkg.name + " --message hello");
});

program.parse(process.argv);

if (process.argv.length === 2) {
  program.help();
} else {
  try {
    cli.print({
      message: program.message
    });
  } catch (_error) {
    console.log("[", "node-cli-boilerplate".white, "]", _error.toString().red);
  }
}
