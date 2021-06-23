//https://snyk.io/vuln/SNYK-JS-IONPARSER-1048971
test("prototype pollution in ion-parser", () => {
  const fs = require("fs");
  const ION = require("ion-parser");

  let obj = {};
  expect({}.polluted).toBe(undefined);

  let parsed = ION.parse(fs.readFileSync("./payload.toml", "utf-8"));
  expect({}.polluted).toBe("yes");
});
