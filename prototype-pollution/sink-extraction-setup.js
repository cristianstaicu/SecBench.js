const fs = require("fs");
const path = require("path");
var originalCookie = Object.getOwnPropertyDescriptor(
  Object.prototype,
  "polluted"
);
// console.log("original ===>> ", originalCookie);
Object.defineProperty(Object.prototype, "polluted", {
  set: function (value) {
    stack = new Error().stack.toString().split("\n");
    // console.log(stack);
    for (let i = 0; i < stack.length; i++) {
      let location = stack[i]
        .replace(/.*vulnerabilities4js/, ".")
        .replace(/\)/g, "")
        .replace("    at ", "");
      let index = stack[i].search("node_modules/");
      // console.log("index ===> ", index);
      if (index != -1) {
        l1 = location.split("node_modules/");
        if (l1.length == 3) {
          l1 = l1[2];
        } else l1 = l1[1];
        // console.log("l1==>",l1);
        l2 = l1.split(/\/(.+)/)[1].trim();
        console.log("sink ==>", l2);
        break;
      }
    }
  },
});
