import glob
import os
import traceback
import subprocess
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
            
            command = subprocess.run(['lsof', '-i', ':8888'], stdout=subprocess.PIPE, check=True)
            # print(command.stdout)
            output = str(command.stdout)
            if "node" in output:
                index = output.index("node")
                end_index = output.index("masudulhasanmasudbhuiyan")
                port = output[index+4:end_index].strip()
                subprocess.run(['kill', '-9', port], stdout=subprocess.PIPE, check=True)
            count+=1
    
    except:
        traceback.print_exc()
    if(count>=5):
        break
   
