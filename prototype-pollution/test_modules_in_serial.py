import glob
import os
import traceback
import subprocess
count=0
lst =  glob.glob("../prototype-pollution/*")
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
            # index = test_file_full_path.find("/",2)
            parts = test_file_full_path.split("prototype-pollution/")
            test_file_name = parts[1]
            print(test_file)
            ping = subprocess.run(['npx','jest', test_file_name], stdout=subprocess.PIPE, check=True)
            print(ping.stdout)
            count+=1
    
    except:
        traceback.print_exc()
    if(count>=1):
        break
   
