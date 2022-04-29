import glob
import os
import traceback
import subprocess
count=0
# not_done_lst = [ 'ianwalter-merge_9.0.1', 'set-getter_0.1.0', 'locutus_2.0.11', 'Templ8_0.7.0', 'Proto_1.1.4', 'node-ini_1.0.0', 'controlled-merge_1.0.0', 'connie_0.1.0']
not_done_lst =[]
lst =  glob.glob("../prototype-pollution/*")
for folder in lst:
    index = folder.rfind("/")
    main_folder_name = folder[index+1:]
    # print(main_folder_name)
    if main_folder_name not in not_done_lst:
        try:
            test_file = glob.glob(folder+"/*.test.js")
            # print(test_file)
            if len(test_file)!=0:
                # print(test_file[0])
                test_file_full_path = test_file[0]
                # index = test_file_full_path.find("/",2)
                parts = test_file_full_path.split("prototype-pollution/")
                test_file_name = parts[1]
                print(test_file)
                ping = subprocess.run(['npx','jest', test_file_name], stdout=subprocess.PIPE, check=True)
                print(ping.stdout)
                count+=1
        
        except:
            traceback.print_exc()
    # if(count>=1):
    #     break
   
