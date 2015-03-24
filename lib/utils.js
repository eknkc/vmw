var fpd = require('find-parent-dir');
var path = require("path");
var cp = require("child_process");

module.exports.vminfo = function(dirname) {
  var folder = fpd.sync(dirname, 'vmw.json');
  return require(path.join(folder, "vmw.json"));
}

module.exports.exec = function(args, callback) {
  cp.execFile("/Applications/VMware Fusion.app/Contents/Library/vmrun", args, callback);
}
