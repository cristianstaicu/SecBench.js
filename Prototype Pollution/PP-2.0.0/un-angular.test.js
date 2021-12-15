test("prototype pollution in angular", () => {
  let angular = require("angular");

  obj = {};
  let payload = `{
    "[__proto__]": {
        "poll": 123
    }
  }`;
  expect({}.polluted).toBe(undefined);

  angular.merge({}, JSON.parse(payload));

  expect({}.polluted).toBe("yes");
});

// if('proto' == ['proto'])
// {
//   console.log(typeof(['proto']))
// }
// else{
//   console.log("no")
// }
