test("Arbitrary code execution in ejs", () => {
  const fs = require("fs");
  const ejs = require("ejs");
  const path = "./ejs";
  const sleep = require("sleep");

  console.log(
    ejs.renderFile("tmp.txt", {}, (e, str) => {
      console.log(e);
      console.log(str);
    })
  );

  sleep.sleep(2);

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
