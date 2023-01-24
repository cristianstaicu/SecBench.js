import glob
import os
import traceback
import subprocess
import time

start = time.time()
count=0
lst =  glob.glob("../ace-breakout/*")
count=0
failed = 0
passed=0
failed_list=[]
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
            ping = subprocess.run(['jest', '--forceExit', test_file_name], stdout=None, check=True)
            print(ping)
            if ping.returncode==0:
                print("TEST PASSED")
                passed+=1
            else:
                print("TEST FAILED")
                failed+=1
            count+=1
    
    except:
        print("TEST FAILED")
        failed+=1
        failed_list.append(test_file_name)
        # traceback.print_exc()
    # if(count>=5):
    #     break

print("******************************************SUMMARY******************************************")
print("-------------------------------------------------------------------------------------------")
print(time.time() - start, "seconds")
print("TOTAL PASSED = ", passed,"/",(passed+failed))
print("TOTAL FAILED = ", failed)
print("Failed Tests=====================>")
print(failed_list)   

