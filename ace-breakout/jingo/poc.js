const untrusted_code =
  "{ toString: !<tag:yaml.org,2002:js/function> 'function (){return Date.now()}' } : 1";

// I'm just converting that string, what could possibly go wrong?
console.log(require("js-yaml").load(untrusted_code));
