package_list=[]
with open("/Users/masudulhasanmasudbhuiyan/Music/vulns4js/Vulnerable-packages/pp-snyk.txt") as in_file:
    for line in in_file:
        if len(line.strip())>0 and "page" not in line:
            if not line.strip().isnumeric():
                package_list.append(line.strip())

# print(len(package_list))

# import pandas as pd
# df = pd.read_csv('/Users/masudulhasanmasudbhuiyan/Music/vulns4js/prototype pollution.csv') 
# print(df['pacakage name'][:100].to_list())

done_list=[]
import glob
import os
lst =  glob.glob("/Users/masudulhasanmasudbhuiyan/Music/vulns4js/prototype-pollution/*")
for folder in lst:
    if os.path.isdir(folder):
        index = folder.rfind("/")
        folder_name_with_version = folder[index+1:]
        underscore_index = folder_name_with_version.rfind("_")
        folder_name = folder_name_with_version[:underscore_index]
        # print(folder_name)
        done_list.append(folder_name)
# print(len(done_list))

remaining_list=[]
out_file = open("to_do_list.txt","a+")
for package in package_list:
    if package not in done_list:
        # print(package)
        remaining_list.append(package)
        out_file.write(package+"\n")
print(len(remaining_list))



