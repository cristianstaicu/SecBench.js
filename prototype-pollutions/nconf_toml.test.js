//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25946

test("prototype pollution in nconf-toml", () => {
  expect({}.polluted).toBe(undefined);

  const nt = require("nconf-toml");
  const fs = require("fs");
  nt.parse(fs.readFileSync("./payload.toml", "utf-8"));

  expect({}.polluted).toBe("yes");
});
