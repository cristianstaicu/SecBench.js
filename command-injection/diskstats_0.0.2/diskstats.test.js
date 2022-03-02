//https://snyk.io/vuln/SNYK-JS-DISKSTATS-590099
test("Command Injection in diskstats", (done) => {
  expect.assertions(2);
  const diskstats = require("diskstats");
  const fs = require("fs");
  const path = "./diskstats";
  const sleep = require("sleep");
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  diskstats.check("; touch diskstats", () => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlinkSync(path);
    done();
  });
});
