const git = require("@npmcli/git");
git
  .clone("git://foo/bar.git;touch aaa", "some-branch", "some-path") // clone a repo
  .then(() => git.spawn("$(touch aaa)"));
