import glob
from operator import le
import os
import traceback
import subprocess
count=0
lst =  glob.glob("../redos/*")

# done_list = ['revalidator_0.3.1', 'github-url-to-object_4.0.2', 'ssri_8.0.0', 'string_3.3.3', 'remove-markdown_0.3.0', 'nth-check_2.0.0', 'trim_0.0.1', 'axios_0.21.0', 'fresh_0.5.0', 'jspdf_2.1.1', 'no-case_2.3.1', 'platform_1.3.4', 'path-parse_1.0.6', 'ramda_0.27.1', 'millisecond_0.1.1', 'papaparse_5.1.1', 'rgb2hex_0.1.0', 'content_3.0.5', 'content-type-parser_1.0.1', 'natural_5.1.0', 'prompts_2.4.0', 'prototype_0.0.5', 'ismobilejs_0.4.1', 'vant_2.12.11', 'tough-cookie_2.3.2', 'chrono-node_2.2.3', 'marked_0.3.6', 'locutus_2.0.10', 'simple-markdown_0.7.2', 'mime_1.4.0', 'sanitize_2.0.0', 'brace-expansion_1.1.6', 'date-and-time_0.14.1', 'moment_2.18.1', 'email-existence_0.1.5', 'd3-color_2.0.0', 'highlight.js_10.4.0', 'is-my-json-valid_2.20.1', 'codemirror_5.58.0', 'ajv_5.2.2', 'truncate_2.0.0', 'ducktype_1.2.0', 'semver-regex_3.1.1', 'tmpl_1.0.0', 'timespan_2.3.0', 'trim-off-newlines_1.0.0', 'html-parse-stringify2_2.0.1', 'is-email_1.0.0', 'ethers_5.2.0', 'terminal-kit_2.1.0', 'printf_0.6.0', 'ansi-html_0.0.7', 'sshpk_1.13.1', 'forwarded_0.1.0', 'is-svg_4.2.2', 'colors-cli_1.0.25', 'htmlparser_1.7.7', 'hosted-git-info_3.0.0', 'urlregex_0.5.0', 'react-native_0.63.0-rc.0', 'ms_0.7.0', 'express-validators_1.0.3', 'amqp-match_0.0.0', 'html-parse-stringify_2.0.0', 'glob-parent_5.0.0', 'charset_1.0.0', 'browserslist_4.16.4', 'url-regex_5.0.0', 'is-url_1.2.2', 'ua-parser-js_0.7.22', 'npm-user-validate_1.0.0', 'uri-js_2.1.1', 'three_0.122.0', 'method-override_2.0.0', 'clean-css_4.1.10', 'underscore.string_3.3.4', 'minimatch_3.0.0', 'postcss_8.0.0', 'slug_0.9.1', 'mobile-detect_1.3.6', 
# 'lodash_4.17.4', 'djvalidator_2.0.0', 'fast-csv_4.3.5', 'normalize-url_6.0.0', 'ws_7.0.0', 'parsejson_0.0.3', 'color-string_1.5.4', 'squalcal']
done_list=[]
# print(len(exclude_list))
for folder in lst:
    # if "cejs" in folder:
    #     continue
    # print(folder)
    index = folder.rfind("/")
    main_folder_name = folder[index+1:]
    # print(main_folder_name)
    if main_folder_name not in done_list:
        try:
            # print(folder)
            test_file = glob.glob(folder+"/*.test.js")
            # print(test_file)
            if len(test_file)!=0:
                # print(test_file[0])
                test_file_full_path = test_file[0]
                index = test_file_full_path.find("/",2)
                test_file_name =  test_file_full_path[index+1:]
                print(test_file_name)
                ping = subprocess.run(['jest', '--forceExit', test_file_name], stdout=subprocess.PIPE, check=True)
                print(ping.stdout)
                # parts = str(ping.stdout).split("  ")
                # for part in parts:
                #     print(part)
                count+=1
        
        except:
            traceback.print_exc()
    # if(count>=5):
    #     break
   
