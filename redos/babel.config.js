// module.exports ={
//     presets: [],
//     plugins: [
//       [require(`./babel-instrumentor.js`)],
//       [require("@babel/plugin-transform-modules-commonjs").default],
//     ],
//     sourceType: "unambiguous",
// };
module.exports = function (api) {
  const presets = [];
  const plugins = [
    [require(`../prototype-pollution/babel-instrumentor.js`)],
    [require("@babel/plugin-transform-modules-commonjs").default],
  ];
  const ignore = ["./require-interception.js"];

  /** this is just for minimal working purposes,
   * for testing larger applications it is
   * advisable to cache the transpiled modules in
   * node_modules/.bin/.cache/@babel/register* */
  api.cache(false);

  return {
    presets,
    plugins,
    ignore,
  };
};
