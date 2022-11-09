# SECBENCH.JS: An Executable Security Benchmark Suite for Server-Side JavaScript

This repository contains the data files, scripts, and code of the Secbench.js benchmark.

# Introduction

Secbench.js is the first benchmark suite of server-side JavaScript vul- nerabilities. This benchmark consists of 600 publicly reported vulnerabilities curated from different advisory databases, such as [Snyk](https://security.snyk.io/), [GitHub Advisories](https://github.com/advisories), and [Huntr.dev](https://www.huntr.dev/).

# Requirments:

To run the expoilts in the benchmark, these packages need to be available in the system:

```
Node.JS version >= 16.3.0
git
curl
zip
psmisc
yarn
g++
make
jest
python 3
```

To install these packages in `Linux/Debian(Ubuntu)` run this command

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
. ~/.bashrc
set -x \
    && curl -sL 'https://deb.nodesource.com/setup_16.x' | bash - \
    && apt-get -y install nodejs \
    && ln -s /usr/bin/nodejs /usr/local/bin/node
apt-get install -y git curl zip psmisc yarn g++ make
npm install --save-dev jest
```

# Core Features

This benchmark includes vulnerabilities from `five` different classes. Th number of 
lable vulnerabilities for each class is given below:

| S.no | Vulnerablity                                | Number of exploits |
| ---- | ------------------------------------------- | ------------------ |
| 1    | Prototype pollution                         | 192                |
| 2    | Regula expression Denial of Service (ReDoS) | 98                 |
| 3    | Command Injection                           | 101                |
| 4    | Path Traversal                              | 169                |
| 5    | Arbitary Code Injection                     | 40                 |

## File Structure

All the reported exploits in the suit follow the same file structure. Different classes of exploits are separated in different folder, thus all the exploits of the class Prototype pollution is availbale in `prototype-pollution` folder. These are the respective folder name for other classes of exploits:

| Vulnerablity                                | Folder name           |
| ------------------------------------------- | --------------------- |
| Prototype pollution                         | `prototype-pollution` |
| Regula expression Denial of Service (ReDoS) | `redos`               |
| Command Injection                           | `command-injection`   |
| Path Traversal                              | `path-traversal`      |
| Arbitary Code Injection                     | `ace-breakout`        |

Inside the root folder of the exploit class, the available exploits are organized in different separate folders for that npm module. The naming convention of the folders follow this format `npm_module_name_x.x.x` where `x.x.x` denote the version number of that library. The number version number is one of the vernarable versions reported in the database.

Each npm module folder consists of two files, first one the jest test case which follows this naming format
`npm_module_name.test.js`. This is the jest test file which checks the vulnerability of the said npm module. The second file is `package.json`, this file inclued all the available metadat for that particular metadata.

One example for the content of the `package.json` file is given below:

```
  "id": "CVE-2019-10744",
  "dependencies": {
    "lodash":"4.17.10"
  },
  "links": {
    "source1": "https://security.snyk.io/vuln/SNYK-JS-LODASH-450202",
    "source2": "https://github.com/advisories/GHSA-jf85-cpcp-j695"
  },
  "fixedVersion":"4.17.12",
  "fixCommit":"
      https://github.com/sailshq/lodash/pull/1/commits/c3fd203b3be87a8177f7f00824033c95f981f984"",
  "sinkLocation": "lodash.js:2573:21"
```

### Description of the Json file

The details of the keys of the json files are given below:

- `id`: id denotes the CVE number of the exploit. If available, we include the cve number; otherwise, we leave it empty.
- ` dependencies`: dependencies list the npm modules necessary for running the test file and testing the reported exploit.
- `links` : Links denote the sources from which we curated the exploits. If there are multiple sources for the same exploits, the benchmark includes all of them. The links are URLs to the available sources.
- `fixedVersion`: If any fix is reported for that particular issue for that npm module, we include the version number of the package that was reportedly fixed. We collected this information by scraping the advisory database or manually analyzing the GitHub commit history of the npm modules.
- `fixCommit` : fixCommit links the exact git commit in which the reported exploit was reported fixed by the developers. If available, we include the GitHub commit link; otherwise, this field will be empty.
- `sinkLocation` : A sink location is a location i.e., line and column number in a file where a built-in API is used to deliver the payload of the exploit. For example,ca typical sink for command injection is _`child_process.exec()`_

## Getting Started

Running the exploits in the benchmark is very easy. To test exploits in any class e.g. `prototype pollution`, from the main directory run,
cd prototype-pollution
Then run

```
npm install
```

This command will install all the necessary npm modules for that exploit class.
Now to test the available exploits in `prototype-pollution`, `redos`, run

```
jest
```

This command will run all the avaialbe exploits in parallal.

For `command-injection` , `path-traversal`, and `ace-breakout`, it possible to run the test using a script. run all the test at once run

```
python3 test_modules_in_serial.py
```

This is script is included in all folders which run all the test cases in serial.

**For `path-traversal` exploits `sleep` module is necessary. Install `sleep` by running**

```
npm install sleep
```

Now, to test one individual module, run

```
cd module_name_verison_number
```

for example

```
cd curling_0.2.0
```

then, run `npm install` to install the necessary module if necessary. Then run

```
jest
```

to run the test suit only for that module.

> **Warning**

If any of the test fail failed to run from the roor folder, please run it in the individual test folder by install the required packages separetly.

## Important Scripts

One of the important features of Secbench.js is extendability. It is possible to add new analysis to the existing code to run dynamic analysis. For example, our test cases can be extended using bable analysis. To get the sink location for the exploits, we extend our analysis using `jest.config.json`, where we added our custom analysis code. Each exploit category folder includes `jest-analysis.config.json` file which can be used to add new analysis code. In order to enable the instrumentation, you need to rename this script to `jest.config.json`.

There are also other analysis scripts available in `script` and `analyses` folder, which we used to produce the graphs for the paper. `scripts/data_factory.ipynb` includes a jupyter notebook which we used to produce most of the metadata for different npm modules and exploits. The notebook also contains necessary comments to reproduce the metadata and other required information.
