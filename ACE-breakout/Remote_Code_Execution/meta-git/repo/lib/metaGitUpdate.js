const debug = require('debug')('meta-git:update');
const exec = require('meta-exec');
const fs = require('fs');
const getMetaFile = require('get-meta-file');
const path = require('path');
const util = require('util');

module.exports = (options = {}) => {
  const meta = getMetaFile({ confirmInMetaRepo: true, warn: false });
  if (!meta) return;

  // Filter out existing projects.
  const missing = Object.keys(meta.projects).filter(name => !fs.existsSync(name));

  if (options.dryRun) {
    if (missing.length) {
      const printMissing = () =>
        util.inspect(
          missing.reduce((memo, name) => {
            memo[name] = meta.projects[name];
            return memo;
          }, {})
        );
      return console.warn(
        `\n*** the following repositories have been added to .meta but are not currently cloned locally:\n\*** ${printMissing()}\n*** type 'meta git update' to correct.`
      );
    } else if (options.log) {
      return console.warn('\n***meta update: all repositories from .meta are cloned and present');
    }
  } else {
    if (!missing.length) {
      if (options.log) console.log('all repositories in .meta are cloned locally');
      return;
    }
    if (options.log) {
      console.log('\n\n cloning missing repositories\n');
    }
    (function next(err) {
      if (err) throw err;
      if (missing.length) {
        const name = missing.pop();
        exec(
          {
            cmd: `git clone ${meta.projects[name]} ${name}`,
            displayDir: path.resolve(name),
          },
          next
        );
      }
    })();
  }
};
