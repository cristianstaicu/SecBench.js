

test("ReDos in fast-csv", () => {
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const csv = require("fast-csv");
    const { Readable } = require("stream");

    let str1 = " "+ genstr(100000," ,") + "- ";// " , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , -"
    
    let t = measureTime(function () {
        let str = Readable.from([str1]);
        str.pipe(csv.parse({ignoreEmpty: true, delimiter: "\t"})).on("data", (d) => console.log(d));
    });
    
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
  });