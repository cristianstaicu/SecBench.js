//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25943

test("proto pollution", () => {
  expect({}.polluted).toBe(undefined);
  const _101 = require("101/set");

  _101({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
