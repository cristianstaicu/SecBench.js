//https://securitylab.github.com/advisories/GHSL-2020-343-redos-Vant/
test("ReDos in vant", () => {
    const isEmail = require("vant/lib/utils/validate/email").isEmail;
    const measureTime = require("./utils").measureTime;
  
    let t = measureTime(function () {
        var check = isEmail("a@0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.");
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });
  