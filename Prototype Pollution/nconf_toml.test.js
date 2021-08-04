//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25946

test("prototype pollution in nconf-toml", () => {
  expect({}.polluted).toBe(undefined);

  const nt = require("nconf-toml");
  const fs = require("fs");
  const path = require("path");

  nt.parse(fs.readFileSync(path.resolve(__dirname, "./payload.toml"), "utf-8"));

  expect({}.polluted).toBe("yes");
});
