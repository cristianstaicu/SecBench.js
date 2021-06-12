test("prototype pollution in klona ", () => {
  var klona = require("klona");

  const payload = '{"__proto__":{"polluted":true}}';

  expect({}.polluted).toBe(undefined);
  const input = JSON.parse(payload);

  const output = klona(input);

  //t.deepEqual(JSON.stringify(output),payload);

  // t.not(({})['a0'], true, 'Safe POJO');
  // t.not(input['a0'], true, 'Safe input');
  // t.not(output['a0'], true, 'Safe output');

  expect({}["polluted"]).toBe(true);
});
