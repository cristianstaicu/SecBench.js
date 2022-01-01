//
test("Arbitrary code execution in grunt", () => {
  const grund = require("grunt");
  expect({}.polluted).toBe(undefined);

  try {
    grund.file.readYAML("./test.yaml");
  } catch (error) {}

  expect({}.polluted).toBe("yes");
});
