# import glob
# from operator import le
# import os
# import traceback
# import subprocess
# count=0
# lst =  glob.glob("../path-traversal/*")
# exclude_list = ['lander_1.0.0', 'gfm-srv_1.1.2', 'hangersteak_0.2.2', 'node-srv_2.0.0', 'basic-static_2.0.2', 'node-static-webserver_0.0.1', 
# 'http-file-server_0.2.6', 'node-staticserver_1.0.3', 'cyber-js_1.0.6', 'file-static-server_1.0.2', 'tinyserver_0.1.1', 
# 'atropa-ide_0.2.2-2', 'node-simple-router_0.10.0', 'static-server-gx_1.2.1', 'wrlc_0.2.5', 'stattic_0.2.3', 'glance_3.0.0', 'express-blinker_0.0.6']
# # print(len(exclude_list))
# for folder in lst:
#     index = folder.rfind("/")
#     main_folder_name = folder[index+1:]
#     # print(main_folder_name)
#     if main_folder_name in exclude_list:
#         try:
#             # print(folder)
#             test_file = glob.glob(folder+"/*.test.js")
#             # print(test_file)
#             if len(test_file)!=0:
#                 # print(test_file[0])
#                 test_file_full_path = test_file[0]
#                 index = test_file_full_path.find("/",2)
#                 test_file_name =  test_file_full_path[index+1:]
#                 print(test_file_name)
#                 ping = subprocess.run(['jest', '--forceExit', test_file_name], stdout=subprocess.PIPE, check=True)
#                 print(ping.stdout)
#                 # parts = str(ping.stdout).split("here!!!!")
#                 # for part in parts:
#                 #     print(part)
#                 count+=1
        
#         except:
#             traceback.print_exc()
#     # if(count>=1):
#     #     break

import glob
import os
import traceback
import subprocess
import time

start = time.time()
count=0
lst =  glob.glob("../path-traversal/*")
for folder in lst:
    index = folder.rfind("/")
    main_folder_name = folder[index+1:]
    # print(main_folder_name)
    try:
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
            count+=1
    
    except:
        traceback.print_exc()
    # if(count>=5):
    #     break
   
print(time.time() - start, "seconds")
   
