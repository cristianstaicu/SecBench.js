//https://snyk.io/vuln/npm:uas-parser:20180305
test("ReDos in uas-parser", () => {
  process.on('uncaughtException', () => {});
  process.on('unhandledRejection', () => {});

  const measureTime = require("./utils").measureTime;  
  const path = require("path");
  const PATH_REQ = path.resolve(__dirname, "./node_modules/uas-parser/node_modules/request");
  require(PATH_REQ);
  jest.mock(PATH_REQ);  
  const uasParser = require("uas-parser");    
     
  let t = measureTime(function () {    
            
    try {
      uasParser.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17 '+ "a".repeat(10000));
    } catch(e) {}
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);  
});

