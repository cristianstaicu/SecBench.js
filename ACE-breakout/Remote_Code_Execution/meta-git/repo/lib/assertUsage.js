module.exports = function assertUsage(command, usage, options = { allow: [] }) {
  const lines = usage.split('\n');
  const regex = new RegExp(`.*${command}(.*)`);
  const childRegex = /\]\s+(\w*)\s?/;
  const usages = new Set();
  const commandOne = process.argv.slice(2)[0];

  function addUsage(regex, line) {
    let token = line
      .match(regex)[1]
      .trim()
      .match(/(\[.*\]|\S+)/)[1];

    if (token[0] === '[') {
      let childToken = token.match(childRegex);

      if (childToken) {
        // optional first param, required second
        return usages.add(childToken[1]);
      } else {
        // multi-choice optional single param
        let matches = token.match(/(-{1,}\w*)/g);
        usages.add(undefined);
        matches.forEach(match => {
          usages.add(match);
        });
        return;
      }
    }

    return usages.add(token);
  }

  if (options.allow instanceof RegExp) {
    return options.allow.test(commandOne);
  } else if (!options.allow instanceof Array) throw new Error('options.allow must be an Array or RegExp');

  options.allow.forEach(usage => {
    usages.add(usage);
  });

  lines.forEach(line => {
    if (!regex.test(line)) return;
    addUsage(regex, line, usages);
  });

  return usages.has(commandOne);
};
