#!/bin/bash
# declare an array called array and define 3 vales
array=('ace-breakout/js-yaml_3.13.0/js-yaml.test.js' 'ace-breakout/mathjs_3.9.0/mathjs.test.js' 'ace-breakout/zhaoyao91-eval-in-vm_0.0.0/zhaoyao91_eval-in-vm.test.js' 
'ace-breakout/pixl-class_1.0.0/pixl-class.test.js' 'ace-breakout/wifiscanner_1.0.1/wifiscanner.test.js' 'ace-breakout/serialize-to-js_0.5.0/serialize-to-js.test.js' 
'ace-breakout/mol-proto_0.1.3/mol-proto.test.js' 'ace-breakout/m-log_0.0.1/m-log.test.js' 'ace-breakout/realms-shim_1.1.0/realms-shim.test.js' 
'ace-breakout/marsdb_0.6.11/marsdb.test.js' 'ace-breakout/djv_2.0.0/djv.test.js' 'ace-breakout/json-ptr_2.0.0/json-ptr.test.js' 
'ace-breakout/hot-formula-parser_3.0.0/hot-formula-parser.test.js' 'ace-breakout/open_0.0.5/open.test.js' 
'ace-breakout/serialize-javascript_2.0.0/serialize-javascript.test.js' 'ace-breakout/is-my-json-valid_2.20.0/is-my-json-valid.test.js' 
'ace-breakout/safe-eval_0.2.0/safe-eval.test.js' 'ace-breakout/static-eval_1.1.1/static-eval.test.js' 'ace-breakout/mongoosemask_0.0.6/mongoosemask.test.js' 
'ace-breakout/node-serialize_0.0.3/node-serialize.test.js' 'ace-breakout/veval_1.0.0/veval.test.js' 'ace-breakout/mathjs_3.10.3/mathjs.test.js' 
'ace-breakout/access-policy_3.1.0/access-policy.test.js' 'ace-breakout/node-extend_0.2.0/node-extend.test.js' 
'ace-breakout/reduce-css-calc_1.2.0/reduce-css-calc.test.js' 'ace-breakout/value-censorship_1.1.0/value-censorship.test.js' 'ace-breakout/mosc_1.0.0/mosc.test.js' 
'ace-breakout/mixin-pro_0.6.0/mixin-pro.test.js' 'ace-breakout/thenify_3.3.0/thenify.test.js' 'ace-breakout/node-rules_3.0.0/node-rules.test.js' 
'ace-breakout/jsen_0.6.6/jsen.test.js' 'ace-breakout/modjs_0.4.0/modjs.test.js' 'ace-breakout/underscore_1.13.0-0/underscore.test.js' 
'ace-breakout/mobile-icon-resizer_0.4.0/mobile-icon-resizer.test.js' 'ace-breakout/safer-eval_1.3.1/safer-eval.test.js' 'ace-breakout/kmc_1.2.2/kmc.test.js' 
'ace-breakout/cd-messenger_2.7.24/poc.test.js' 'ace-breakout/modulify_0.1.0/modulify.test.js' 'ace-breakout/mongo-parse_2.1.0/mongo-parse.test.js' 
'ace-breakout/local-devices_2.0.0/local-devices.test.js')
for i in "${array[@]}"
do
	jest $i;
done