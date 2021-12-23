console.log("Before : " + {}.polluted);
// require('./env').getCollection(function(err, collection) {
//     assert.ifError(err);
//     col = collection;
//     done();
//   });
import { MangoQuery } from "rxdb";
var payload = JSON.parse('{"__proto__": {"polluted": "vulnerable"}}');
var m = mquery(payload);
console.log({}.polluted);

// describe('merge', function() {
//     it('avoids prototype pollution', function() {
//       var payload = JSON.parse('{"__proto__": {"polluted": "vulnerable"}}');
//       var obj = {};
//       utils.merge(obj, payload);

//       assert.strictEqual({}.polluted, void 0);
//     });
//   });
