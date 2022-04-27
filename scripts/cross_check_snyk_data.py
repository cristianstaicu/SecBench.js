import csv
from operator import le
import pandas as pd
import numpy as np
import math
import json
import re
import glob
from distutils.version import StrictVersion
from distutils.version import LooseVersion, StrictVersion
import pkg_resources
import warnings
warnings.filterwarnings('ignore')

main_package_name = ""
total_count=0

package_dict = {}

# total_count=0
# lst = ["prototype-pollution", "ace-breakout", "command-injection", "path-traversal", "redos"]
# for _path in lst:
#     line_list=[]
#     with open("../analyses/graphs/vuln-versions_"+_path+"_detail.txt") as in_file:
#         for line in in_file:
#             if len(line.strip())>0:
#                 line_list.append(line)

#     # print(line_list)
#     main_list = [[] for i in range(200)]
#     package_name_list=[]
#     k=0
#     for i in range(len(line_list)):
#         if i != len(line_list)-1:
#             line = line_list[i]
#             parts = line.split("->")
#             if "101" in line:
#                 continue
#             # print(parts)
#             package_part = parts[0]
#             first_digit = re.search('-\d', package_part)
#             if first_digit:
#                 package = package_part[:first_digit.start()]
#                 # print(package)
#                 first_package_vulnerability = parts[1]
#                 # print(first_package_vulnerability)
#                 # print(k)
#                 if "PASSED" in first_package_vulnerability:
#                     main_list[k].append(1)
#                 else:
#                     main_list[k].append(0)

#                 line = line_list[i+1]
#                 parts = line.split("->")
#                 # print(parts)
#                 package_part = parts[0]
#                 m = re.search('-\d', package_part)
#                 if m:
#                     next_package = package_part[:m.start()]
#                     # print(next_package)
#                     if package!=next_package:
#                         k+=1
#                         package_name_list.append(package)
#         else:
#             line = line_list[i]
#             parts = line.split("->")
#             first_package_vulnerability = parts[1]
#             # print(first_package_vulnerability)
#             if "PASSED" in first_package_vulnerability:
#                 main_list[k].append(1)
#             else:
#                 main_list[k].append(0)
#             package_name_list.append(package)
# # print(package_name_list)
# # print(main_list)
#     print(_path)
#     for i in range(len(main_list)):
#         lst = main_list[i]
#         if len(lst)>0:
#             str_=""
#             for x in lst:
#                 str_+=str(x)
#             # print(str_)
#             m = re.search(r"1.*0.*1", str_)
#             if m:
#                 print(package_name_list[i])
#                 total_count+=1
#                 # print(str_)
#     print("\n\n\n")

# print(total_count)


def cross_check_with_data(vulnerable_versions, lst, package_name):
    print(vulnerable_versions)
    # global total_count
    # found = False
    # version_list=[]
    # for package_ in lst:
    #     if package_ not in vulnerable_versions:
    #         found = True
    #         version_list.append(package_)
    #         # if "." not in package_:
    #         #     print(package_name)

    #         # print("package ===>>", package_name,"  ", package_)
    #         # print(lst)
    #         # print(vulnerable_versions)
    # if found:
    #     total_count+=1
    #     print(package_name)
    #     # print("ver ==>", vulnerable_versions)
    #     # print("passed ==>", lst)
    #     print(version_list)
    #     print("\n\n")
    

def get_affected_version(affected_version_str, data):
    # if main_package_name == "sanitize":
    #     print("hey!===>>", affected_version_str)
    vulnerable_versions=[]
    if "*" == affected_version_str.strip():
        if type(data) is str:
           vulnerable_versions.append(data)
        else:
            vulnerable_versions+=data
    else:
        if ">" in affected_version_str and "<" in affected_version_str:
            parts = affected_version_str.strip().split(" ")
            # print(parts)
            k=0
            for x in data:
                if k>=len(parts):
                    k=len(parts)-1
                package_version = parts[k].replace("<","").replace(">","").replace("=","").strip()
                if x == package_version:
                    if "=" in parts[k]:
                        vulnerable_versions.append(x)
                    k+=1
                else:
                    if "<" in parts[k]:
                        if pkg_resources.parse_version(x) < pkg_resources.parse_version(package_version):
                            vulnerable_versions.append(x)
                    if ">" in parts[k]:
                        if pkg_resources.parse_version(x) > pkg_resources.parse_version(package_version):
                            vulnerable_versions.append(x)
            
            # print(data)
            # print(affected_version_str)
            # print(vulnerable_versions)
            # print("\n\n\n")

        elif "<" in affected_version_str:
            m = re.search('\d', affected_version_str)
            if m:
                affected_version = affected_version_str[m.start():].strip()
            # print(affected_version)
            for x in data:
                # print(x, "affected_version====>", affected_version)
                if x==affected_version:
                    if "<=" in affected_version_str:
                        vulnerable_versions.append(x)
                    break
                else:
                    vulnerable_versions.append(x)

        elif ">" in affected_version_str:
            # print(affected_version_str)
            m = re.search('\d', affected_version_str)
            if m:
                non_affected_version = affected_version_str[m.start():].strip()
            # print(non_affected_version)
            should_include =False
            for x in data:
                # print(x)
                if should_include:
                    vulnerable_versions.append(x)
                if x==non_affected_version:
                    if ">=" in affected_version_str:
                        vulnerable_versions.append(x)
                    should_include = True
            # print(vulnerable_versions)
        else:
            print(affected_version_str)
    
    return vulnerable_versions

synk_df = pd.read_csv('synk.csv')
ga_df = pd.read_csv('github_advisory.csv')
# print(ga_df)

lst = ["prototype-pollution", "ace-breakout", "command-injection", "path-traversal", "redos"]
for _path in lst:
    line_list=[]
    with open("../analyses/graphs/vuln-versions_"+_path+"_detail.txt") as in_file:
        for line in in_file:
            if len(line.strip())>0:
                line_list.append(line)

    main_list = [[] for i in range(200)]
    package_name_list=[]
    k=0
    for i in range(len(line_list)):
        if i != len(line_list)-1:
            line = line_list[i]
            parts = line.split("->")
            if "101" in line:
                continue
            package_part = parts[0]
            first_digit = re.search('-\d', package_part)
            if first_digit:
                package = package_part[:first_digit.start()]
                first_package_vulnerability = parts[1]
                version_number = package_part[first_digit.start()+1:]
                if "PASSED" in first_package_vulnerability:
                    main_list[k].append(version_number)
                line = line_list[i+1]
                parts = line.split("->")
                package_part = parts[0]
                m = re.search('-\d', package_part)
                if m:
                    next_package = package_part[:m.start()]
                    if package!=next_package:
                        k+=1
                        package_name_list.append(package)
        else:
            line = line_list[i]
            parts = line.split("->")
            first_package_vulnerability = parts[1]
            package_part = parts[0]
            first_digit = re.search('-\d', package_part)
            if first_digit:
                package = package_part[:first_digit.start()]
                first_package_vulnerability = parts[1]
                version_number = package_part[first_digit.start()+1:]
                if "PASSED" in first_package_vulnerability:
                    main_list[k].append(version_number)
            package_name_list.append(package)

    print(_path)
    f = open("../analyses/graphs/all-versions_"+_path+".json")
    data = json.load(f)
    count = 0
    for i in range(len(main_list)):
        lst = main_list[i]
        if len(lst)>0:
            package_name = package_name_list[i]
            df = synk_df[synk_df['Package Name']==package_name].reset_index(drop=True)
            # if package_name == "sanitize":
            #     print("length ====>", len(df))
            if len(df)==0:
                df2 = ga_df[ga_df['Package Name']==package_name].reset_index(drop=True)
                if "htmlparser" == package_name:
                    affected_version = "*"
                if "urlregex" == package_name:
                    affected_version = "*"
                if "rollup-plugin-serve" == package_name:
                    affected_version = "*"
                if "connie" == package_name:
                    affected_version = "<0.1.1"
                if "Templ8" == package_name:
                    affected_version = "*"
                if len(df2)==1:
                    affected_version = df2['Affected Version'][0].strip()
                    affected_version = affected_version.replace(" ","")
                    if "0.0.0" in affected_version:
                        affected_version = "*"
                version_list = data[package_name]
                vulnerable_versions = get_affected_version(affected_version, version_list)
                        
            elif len(df)==1:
                affected_version = df['Affected Version'][0].strip()
                if package_name == "sanitize":
                    affected_version = "<2.1.0"
                parts = affected_version.strip().split(" ")
                if len(parts)>1:
                    dict_={}
                    versions=[]
                    for part in parts:
                        try:
                            first_digit = re.search('\d', part)
                            version = part[first_digit.start():]
                            dict_[version]=part
                            versions.append(version)
                            versions.sort(key=StrictVersion)
                            affected_version = ""
                            for x in versions:
                                affected_version+=dict_[x]+" "
                            affected_version = affected_version.strip()
                        except:
                            pass
                version_list = data[package_name]
                main_package_name = package_name
                # if package_name == "sanitize":
                    # print(len(parts), version_list)
                #     print(df['Affected Version'][0].strip())
                vulnerable_versions = get_affected_version(affected_version, version_list)
            else:
                folders = glob.glob("../"+_path+"/*")
                found = False
                for folder in folders:
                    last_index = folder.rfind("/")
                    folder_name = folder[last_index+1:].strip()
                    # print(folder_name)
                    if folder_name.startswith(package_name+"_"):
                        json_file_path = folder+"/package.json"
                        f = open(json_file_path)
                        data_ = json.load(f)
                        
                        links = data_['links']
                        source1 = links['source1']
                        source2 = links['source2']

                        source = ""
                        if source1 != "" or source2 != "":
                            if "snyk" in source1:
                                source = source1
                            elif "snyk" in source2:
                                source = source2

                        df1 = df[df['Details Page']==source.strip()].reset_index(drop=True)
                        if len(df1)==0:
                            if "realms-shim" == package_name:
                                affected_version = "*"
                            if "markdown-it" == package_name:
                                affected_version = "<12.3.2"
                            if "markdown-to-jsx" == package_name:
                                continue  
                            version_list = data[package_name]
                            vulnerable_versions = get_affected_version(affected_version, version_list)
                        else:
                            affected_version = df1['Affected Version'][0].strip()
                            parts = affected_version.strip().split(" ")
                            if len(parts)>1:
                                dict_={}
                                versions=[]
                                for part in parts:
                                    first_digit = re.search('\d', part)
                                    version = part[first_digit.start():]
                                    dict_[version]=part
                                    versions.append(version)
                                versions.sort(key=StrictVersion)
                                affected_version = ""
                                for x in versions:
                                    affected_version+=dict_[x]+" "
                                affected_version = affected_version.strip()


                            version_list = data[package_name]
                            vulnerable_versions = get_affected_version(affected_version, version_list)
                        found = True
                        break
                if not found:
                    print("Name ========>>>>>>>",package_name)
            
            if len(vulnerable_versions)==0:
                print("zeo version! =====> ", package_name)
            package_dict[package_name] = vulnerable_versions
            # cross_check_with_data(vulnerable_versions, lst, package_name)

print("total count=====>", total_count) 
# for key in package_dict:
#     print(package_dict[key])  
                
