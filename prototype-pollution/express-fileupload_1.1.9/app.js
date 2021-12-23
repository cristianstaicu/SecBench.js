const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload({ parseNested: true }));
app.post("/", (req, res) => {
  res.end("express-fileupload poc");
  // res.sendStatus(200)
});

// export default app
module.exports = app;
