
const dat = require('dat.gui');

var gui = new dat.gui.GUI();
var Options = function() {
this.color0 = "rgb( "; // CSS string
};

window.onload = function() {
var options = new Options();
gui.addColor(options, 'color0');
};

var gui = new dat.gui.GUI();
var Options = function() {
this.color0 = "rgba( "; // CSS string
};

window.onload = function() {
var options = new Options();
gui.addColor(options, 'color0');
};