import json
from numpy import average, std
import requests
import collections
import glob
import os
import requests
import collections
from bs4 import BeautifulSoup
import traceback
import json
from datetime import datetime, date
import scipy as sp
import csv
import re

done_list=[]
# with open("./dependencey_list.txt","r+") as in_file:
#     for line in in_file:
#         if "package name" in line:
#             parts=line.split("===>")
#             done_list.append(parts[1].strip())

# print(len(done_list))
            

# out_file = open("dependencey_list.txt","a+")
# lst = ["prototype-pollution", "ace-breakout", "command-injection", "path-traversal", "redos"]
# for _path in lst:
#     json_file_path = "../analyses/graphs/all-versions_"+_path+".json"
#     try:
#         f = open(json_file_path)
#         data = json.load(f)
#         for key in data:
#             if key not in done_list:
#                 # URL = "https://www.npmjs.com/browse/depended/"+key
#                 URL = "https://www.npmjs.com/package/"+key
#                 print(URL)
#                 page = requests.get(URL)
#                 soup = BeautifulSoup(page.content, 'html.parser')
#                 # index = str(soup).find("dependentsTruncated")
#                 # print(index)
#                 out_str = str(soup.select("._0d2164ff"))+"\n"
                
#                 if "Next Page" in str(soup):
#                     offset =36
#                     while True:
#                         URL = "https://www.npmjs.com/browse/depended/"+key+"?offset="+str(offset)
#                         print(URL)
#                         page = requests.get(URL)
#                         soup = BeautifulSoup(page.content, 'html.parser')
#                         out_str+= str(soup.select("._0d2164ff"))+"\n"
#                         if "Next Page" not in str(soup):
#                             break
#                         offset+=36
                
#                 # print(out_str)
#                 out_file.write("package name ===> "+key+"\n")
#                 out_file.write(out_str)
#                 out_file.flush()
#     except:
#         print(_path)
    # break

# key=""
# with open("./npm_response.txt","r+") as in_file:
#     for line in in_file:
#         if "package name" not in line:
#             if "Dependents<" in line:
#                 done_list.append(key)
#         else:
#             parts=line.split("===>")
#             key = parts[1].strip()

# print(len(done_list))


# out_file = open("npm_response.txt","a+")
# lst = ["prototype-pollution", "ace-breakout", "command-injection", "path-traversal", "redos"]
# for _path in lst:
#     json_file_path = "../analyses/graphs/all-versions_"+_path+".json"
#     try:
#         f = open(json_file_path)
#         data = json.load(f)
#         for key in data:
#             if key not in done_list:
#                 # URL = "https://www.npmjs.com/browse/depended/"+key
#                 URL = "https://www.npmjs.com/package/"+key
#                 print(URL)
#                 page = requests.get(URL)
#                 soup = BeautifulSoup(page.content, 'html.parser')
#                 # index = str(soup).find("dependentsTruncated")
#                 # print(index)
#                 # out_str = str(soup.select("._0d2164ff"))+"\n"

#                 out_str = str(soup.select("#package-tab-dependents"))+"\n"
#                 print(out_str)
#                 # break
                    
#                 # print(out_str)
#                 out_file.write("package name ===> "+key+"\n")
#                 out_file.write(out_str)
#                 out_file.flush()
#     except:
#         print(_path)

# import re
# i=0
# count=0
# # done_list=[]

lst=[]
key=""
with open("./npm_response.txt","r+") as in_file:
    for line in in_file:
        if "package name" not in line:
            if "Dependents<" in line:
                index = line.rfind("svg>")
                end_index = line.rfind("Dependents<")
                dependent = line[index+4:end_index].replace(",","")
                # print(dependent)
                lst.append(int(dependent))

# print(lst)
print("MAX Dependent===>", max(lst))
print("MIN Dependent===>", min(lst))
print("AVG Dependent===>", average(lst))
print("STD Dependent===>", std(lst))



lst=[]
key=""
with open("./dependencey_actual_list.txt","r+") as in_file:
    for line in in_file:
        if "package name" not in line:
            line = line.replace("[","").replace("]","").strip()
            # print(line)
            if len(line)==0:
                lst.append(0)
            else:
                # print(line)
                parts = line.split(",")
                # print(len(parts))
                lst.append(len(parts))

# print(lst)
print("\n\n\nMAX Dependency===>", max(lst))
print("MIN Dependency===>", min(lst))
print("AVG Dependency===>", average(lst))
print("STD Dependency===>", std(lst))


# import re
# i=0
# count=0
# # done_list=[]
# with open("./dependencey_list.txt","r+") as in_file:
#     for line in in_file:
#         if "package name" not in line:
#             lst = [m.start() for m in re.finditer('<a href="', line)]
#             for index in lst:
#                 end_index = line.find("\"", index+10)
#                 str_ = line[index+10:end_index]

#                 count+=1
#         else:
#             i+=1
#         if i==2:
#             break
# print(count)








# import json
# import requests
# import collections
# import glob
# import os
# import requests
# import collections
# from bs4 import BeautifulSoup
# import traceback
# import json
# from datetime import datetime, date
# import scipy as sp
# import csv
# import re
# import glob
# from operator import le
# import os
# import traceback
# import subprocess
# import io

# out_file = open("dependencey_actual_list.txt","a+")
# lst = ["prototype-pollution", "ace-breakout", "command-injection", "path-traversal", "redos"]
# for _path in lst:
#     json_file_path = "../analyses/graphs/all-versions_"+_path+".json"
#     try:
#         f = open(json_file_path)
#         data = json.load(f)
#         for key in data:
#             try:
#                 # print(key)
#                 ping = subprocess.run(['npm', 'view', key, 'dependencies', '--json'], stdout=subprocess.PIPE, check=True)
#                 fix_bytes_value = ping.stdout.replace(b"'", b'"')
#                 if len(fix_bytes_value)>0:
#                     data_ = json.load(io.BytesIO(fix_bytes_value))
#                     # print(data_)
#                     package_lst=[]
#                     for package_ in data_:
#                         package_lst.append(package_)
#                     # print(lst)
#                     out_file.write("package name ===> "+key+"\n")
#                     out_file.write(str(package_lst)+"\n")
#                     out_file.flush()
#                 else:
#                     out_file.write("package name ===> "+key+"\n")
#                     out_file.write("[]\n")
#                     out_file.flush()
#             except:
#                 print(key)
#                 print(len(fix_bytes_value))
#                 traceback.print_exc()
#             # break
#     except:
#         # print(_path)
#         traceback.print_exc()
#     # break


