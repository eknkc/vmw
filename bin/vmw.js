#!/usr/bin/env node

var program = require('commander');
var package = require("../package.json")
var utils = require("../lib/utils.js")
var cp = require("child_process");
var vminfo = utils.vminfo(process.cwd());

if (!vminfo || !vminfo.vm) {
  console.error("Could not find a valid vmw.json file.")
  process.exit(1);
}

program
.version(package.version)
.command('start').alias('up')
.description('start up vm')
.action(function (dir, otherDirs) {
  process.stdout.write('Starting vm...');

  utils.exec(["start", vminfo.vm, !vminfo.gui ? "nogui" : "gui"], function (err, data) {
    console.log(" done!");
  });
});

program
.command('stop').alias('down')
.description('stop vm')
.action(function (dir, otherDirs) {
  process.stdout.write('Stopping vm...');

  utils.exec(["stop", vminfo.vm], function (err, data) {
    console.log(" done!");
  });
})

program
.command('pause')
.description('pause vm')
.action(function (dir, otherDirs) {
  process.stdout.write('Pausing vm...');

  utils.exec(["pause", vminfo.vm], function (err, data) {
    console.log(" done!");
  });
})

program
.command('resume').alias('unpause')
.description('resume vm')
.action(function (dir, otherDirs) {
  process.stdout.write('Resuming vm...');

  utils.exec(["unpause", vminfo.vm], function (err, data) {
    console.log(" done!");
  });
})

program
.command('ip')
.description('get vm ip address')
.action(function (dir, otherDirs) {
  utils.exec(["getGuestIPAddress", vminfo.vm], function (err, data) {
    process.stdout.write(data);
  });
})

program.parse(process.argv);
