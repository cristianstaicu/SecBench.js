import csv
from matplotlib import style
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
warnings.filterwarnings('ignore')

total_count=0
target_list= ["underscore.string", "ts-dot-prop", "jspdf", "glob-parent", "changeset"]
tobe_tested_list=[]
legends=['changeset', 'ts-dot-\nprop', 'glob-\nparent', 'jspdf', 'underscore.\nstring']

our_vulnerable_version_list=[]
snyk_vulnerable_version_list=[]
list_of_all_versions=[]

def cross_check_with_data(vulnerable_versions, lst, package_name, all_version_list):
    global total_count
    found = False
    version_list=[]

    for package_ in lst:
        if package_ not in vulnerable_versions:
            found = True
            version_list.append(package_)
            # if "." not in package_:
            #     print(package_name)

            # print("package ===>>", package_name,"  ", package_)
            # print(lst)
            # print(vulnerable_versions)
    if found:
        total_count+=1
        # print(package_name)
        # print(len(all_version_list))
        # print(len(version_list))
        # tobe_tested_list.append(package_name)
        if package_name in target_list:
        # print("ver ==>", vulnerable_versions)
        # print("passed ==>", lst)
            # print(package_name)
            # legends.append(package_name)
            # print(all_version_list)
            # print(version_list)
            # print("\n\n")
            our_vulnerable_version_list.append(lst)
            snyk_vulnerable_version_list.append(vulnerable_versions)
            list_of_all_versions.append(all_version_list)

        # if len(all_version_list)<=100:
        #     print(package_name, " ",len(all_version_list), "===>", len(version_list))

        # if "mithril" in package_name:
        #     print("=====>", vulnerable_versions)
        #     our_vulnerable_version_list.append(lst)
        #     snyk_vulnerable_version_list.append(vulnerable_versions)
        #     list_of_all_versions.append(all_version_list)
    
    # return our_vulnerable_version_list, snyk_vulnerable_version_list, list_of_all_versions

        
    

def get_affected_version(affected_version_str, data):
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
                # if x == package_version:
                if pkg_resources.parse_version(x) >= pkg_resources.parse_version(package_version):
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
            # print(affected_version_str)
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
    package_index_dict={}
    index_number = 0
    print(_path)
    line_list=[]
    with open("../analyses/graphs/vuln-versions_"+_path+"_detail.txt") as in_file:
        for line in in_file:
            if len(line.strip())>0:
                line_list.append(line)

    # print(line_list)
    main_dict={}
    main_list = [[] for i in range(200)]
    package_name_list=[]
    k=0
    primary_lst=[]
    for i in range(len(line_list)):
        if i != len(line_list)-1:
            line = line_list[i]
            parts = line.split("->")
            if "101" in line:
                continue
            # print(parts)
            package_part = parts[0]
            first_digit = re.search('-\d', package_part)
            if first_digit:
                package = package_part[:first_digit.start()]
                first_package_vulnerability = parts[1]
                version_number = package_part[first_digit.start()+1:]
                if "PASSED" in first_package_vulnerability:
                    # main_list[k].append(version_number)
                    primary_lst.append(version_number)
                # else:
                #     main_list[k].append(0)
                line = line_list[i+1]
                parts = line.split("->")
                package_part = parts[0]
                m = re.search('-\d', package_part)
                if m:
                    next_package = package_part[:m.start()]
                    if package!=next_package:
                        k+=1
                        package_name_list.append(package)
                        secondary_lst=[]
                        for element in primary_lst:
                            secondary_lst.append(element)
                        main_dict[package]=secondary_lst
                        primary_lst=[]
                        
        else:
            line = line_list[i]
            parts = line.split("->")
            first_package_vulnerability = parts[1]
            package_part = parts[0]
            first_digit = re.search('-\d', package_part)
            if first_digit:
                package = package_part[:first_digit.start()]
                # print(package)
                first_package_vulnerability = parts[1]
                # print(first_package_vulnerability)
                # print(k)
                version_number = package_part[first_digit.start()+1:]
                if "PASSED" in first_package_vulnerability:
                    # main_list[k].append(version_number)
                    primary_lst.append(version_number)
            
            package_name_list.append(package)
            secondary_lst=[]
            for element in primary_lst:
                secondary_lst.append(element)
            main_dict[package]=secondary_lst
            primary_lst=[]
# print(main_dict)
    # k=0
    # for key in main_dict:
    #     k+=1
    #     print(key, " -->", len(main_dict[key]))
    # print(k)
    # print("\n\n\n")
# print(main_list)
    # print(_path)
    f = open("../analyses/graphs/all-versions_"+_path+".json")
    data = json.load(f)
    # print(data)
    count = 0
    for key in main_dict:
        lst = main_dict[key]
        if len(lst)>0:
            package_name = key
            df = synk_df[synk_df['Package Name']==package_name].reset_index(drop=True)
            if len(df)==0:
                df2 = ga_df[ga_df['Package Name']==package_name].reset_index(drop=True)
                # print("length=====>>>>", len(df2), " ",package_name)
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
                    # print(df2)
                    affected_version = df2['Affected Version'][0].strip()
                    affected_version = affected_version.replace(" ","")
                    if "0.0.0" in affected_version:
                        affected_version = "*"
                version_list = data[package_name]
                vulnerable_versions = get_affected_version(affected_version, version_list)
                # print(vulnerable_versions)
                        
            elif len(df)==1:
                affected_version = df['Affected Version'][0].strip()
                if package_name =="sanitize":
                    affected_version ="<2.1.0"

                parts = affected_version.strip().split(" ")
                if len(parts)>1:
                    # print(parts)
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
                            # print(vulnerable_versions)
                        else:
                            # if len(df1)==1:
                            affected_version = df1['Affected Version'][0].strip()
                            parts = affected_version.strip().split(" ")
                            if len(parts)>1:
                                # print(parts)
                                dict_={}
                                versions=[]
                                for part in parts:
                                    first_digit = re.search('\d', part)
                                    version = part[first_digit.start():]
                                    # print(version)
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
            
            # if package_name == "set-or-get":
            #     print(df)
            
            # print(len(version_list))
            cross_check_with_data(vulnerable_versions, lst, package_name, version_list)
            # count+=1
    # print(count)

# print("total count=====>", total_count)   

# print(our_vulnerable_version_list)
# print(snyk_vulnerable_version_list)
# print(list_of_all_versions)

# print(legends)

def add_fancy_patch_around(ax, bb, **kwargs):
    fancy = FancyBboxPatch((bb.xmin, bb.ymin), bb.width, bb.height,
                           fc=(1, 0.8, 1, 0.5), ec=(1, 0.5, 1, 0.5),
                           **kwargs)
    ax.add_patch(fancy)
    return fancy


import seaborn as sns
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
import matplotlib.pyplot as plt
import matplotlib.transforms as mtransforms
import matplotlib.patches as mpatch
from matplotlib.patches import FancyBboxPatch

sns.set()
sns.set_style("whitegrid")
sns.set_palette("Set2")
plt.rcParams["figure.figsize"] = (12, 8)
fig, ax = plt.subplots()
font_size = 30
legend_font_size = 22
ax.spines['right'].set_visible(False)
ax.spines['top'].set_visible(False)
#create simple line plot
ax.plot()
y_position =0
should_our_suit=True
should_snyk= True
should_non_vul = True

for i in range(len(list_of_all_versions)):
    x_position=0
    lst=list_of_all_versions[i]
    print(lst)
    print(our_vulnerable_version_list[i])
    print(snyk_vulnerable_version_list[i])
    print("\n\n")
    for element in lst:
        if element in our_vulnerable_version_list[i]:
            ax.add_patch(Rectangle((x_position, y_position), 2, 1, fill=True, facecolor='#f00', hatch='\\\\\\', label="Vulnerable in Exploits4JS" if (should_our_suit) else None ))
            should_our_suit = False
        else:
            ax.add_patch(Rectangle((x_position, y_position), 2, 1, fill=True, color='gray', edgecolor='black', label="Not vulnerable" if (should_non_vul) else None))
            should_non_vul = False
        
        if element in snyk_vulnerable_version_list[i]:
            ax.add_patch(Rectangle((x_position, y_position+1.5), 2, 1, fill=True, facecolor='#a300ff', hatch='//', label="Vulnerable in Snyk" if (should_snyk) else None))
            should_snyk = False
        else:
            ax.add_patch(Rectangle((x_position, y_position+1.5), 2, 1, fill=True, color='gray', edgecolor='black', label="Not vulnerable" if (should_non_vul) else None))
            should_non_vul = False
        
        x_position+=3
    y_position+=6

fancy = FancyBboxPatch((-.5, -.2), 18,3,
                           fc=(1, 0.8, 1, 0.5), ec=(1, 0.5, 1, 0.5))
ax.add_patch(fancy) 

fancy = FancyBboxPatch((47.5, 5.8), 9,3,
                           fc=(1, 0.8, 1, 0.5), ec=(1, 0.5, 1, 0.5))
ax.add_patch(fancy) 

fancy = FancyBboxPatch((20.5, 11.8), 15,3,
                           fc=(1, 0.8, 1, 0.5), ec=(1, 0.5, 1, 0.5))
ax.add_patch(fancy) 

fancy = FancyBboxPatch((59.8, 17.8), 12,3,
                           fc=(1, 0.8, 1, 0.5), ec=(1, 0.5, 1, 0.5))
ax.add_patch(fancy) 

fancy = FancyBboxPatch((26.8, 23.8), 20.5,3,
                           fc=(1, 0.8, 1, 0.5), ec=(1, 0.5, 1, 0.5))
ax.add_patch(fancy) 

ax.set_yticks([1,7,13,19,25])
ax.set_yticklabels(legends)
# ax.set_ylabel("Count", fontsize=font_size, labelpad=20)
# ax.set_xlabel("Exploits", fontsize=font_size, labelpad=20)

ax.tick_params(axis='both', which='major')
ax.tick_params(axis='y', which='major', labelsize=legend_font_size, rotation=0)
ax.tick_params(axis='x', which='major', labelsize=legend_font_size, rotation=0)
ax.grid(False)
plt.legend(bbox_to_anchor=(0,1.02,1,0.2), loc="lower left",
                mode="expand", borderaxespad=0, ncol=3)
plt.setp([ax.get_legend().get_texts()], fontsize=legend_font_size)
# ax.patches[0].set_facecolor('#808080') 
fig.tight_layout()
# plt.subplots_adjust(top=0.91, right=0.99, bottom=.32)
plt.savefig("mismatch_with_snyk.pdf")

plt.show()

                
# print(tobe_tested_list)

# print(list_of_all_versions)

import pygraphviz as PG

print(list_of_all_versions)

# URL = 'https://registry.npmjs.org/mithril'
# print(URL)
# page = requests.get(URL)
# soup = BeautifulSoup(page.content, 'html.parser')
# # print(str(soup))
# site_json=json.loads(soup.text)
# # print(site_json['versions'])
# lst = []
# for key in site_json['versions']:
#         # print(key)
#         lst.append(key)
# print(lst)

# lst = [
#     "0.1.0", "0.1.2", "0.1.3", "0.1.4", "0.1.12","0.1.13","0.1.16","0.1.17","0.1.18","0.1.19",
# "0.1.20","0.1.21","0.1.22","0.1.23","0.1.24","0.1.25","0.1.26","0.1.27","0.1.28","0.1.29","0.1.30","0.1.31",
# "0.1.32","0.1.33","0.1.34-beta.0","0.1.34","0.2.0","0.2.2-rc.1","0.2.3","0.2.4","0.2.5","0.2.7","0.2.8","1.0.0-rc.1","1.0.0-rc.2",
# "1.0.0-rc.3","1.0.0-rc.4","1.0.0-rc.5","1.0.0-rc.6","1.0.0-rc.7","1.0.0-rc.8","1.0.0","1.0.1","1.1.0-rc.1","1.1.0","1.1.1","1.1.2","1.1.3",
# "1.1.4","1.1.5","1.1.6","1.1.7","2.0.0-rc.0","2.0.0-rc.1","2.0.0-rc.2","2.0.0-rc.3","2.0.0-rc.4","2.0.0-rc.5","2.0.0-rc.6","2.0.0-rc.7","2.0.0-rc.8",
# "2.0.0-rc.9","2.0.1","2.0.3","2.0.4","2.0.11-next.0"]

lst = [
    "0.1.0", "0.1.2", "0.1.3", "0.1.4","...",
"0.2.3","0.2.4","0.2.5","0.2.7","0.2.8","1.0.0-rc.1","....",
"1.0.0-rc.6","1.0.0-rc.7","1.0.0-rc.8","1.0.0","..",
"1.1.6","1.1.7","2.0.0-rc.0",".....","2.0.0-rc.7","2.0.0-rc.8",
"2.0.0-rc.9","2.0.1","2.0.3","2.0.4","2.0.11-next.0"]

exclude_list=["0.1.12","0.1.13","0.1.16","0.1.17","0.1.18","0.1.19",
"0.1.20","0.1.21","0.1.22","0.1.23","0.1.24","0.1.25","0.1.26","0.1.27","0.1.28","0.1.29","0.1.30","0.1.31"]

print(our_vulnerable_version_list[0])
print(snyk_vulnerable_version_list[0])
A = PG.AGraph(directed=True, strict=True)
A.node_attr["shape"] = "box"
A.graph_attr["rankdir"] = "LR"
A.graph_attr["ratio"] = "compress"
A.graph_attr['rank']='same'
# A.graph_attr["size"] = "7.5,10"
# A.graph_attr["nodesep"]="0.01"
# A.graph_attr["ranksep"]="0.5"

# A.add_nodes_from(list_of_all_versions[0])
root_node_list=[]
root_node_list.append(lst[0])
for i in range(len(lst)-1):
    print(lst[i]," ->", lst[i+1])
    
    if lst[i] in our_vulnerable_version_list[0]:
        # n = A.get_node(lst[i])
        # n.attr["shape"] = "box"
        A.add_node(lst[i], color="red")
    
    if lst[i] in snyk_vulnerable_version_list[0]:
        n = A.get_node(lst[i])
        n.attr["style"] = "dotted"
        n.attr["color"] = "red"
    
    if lst[i] =="....." :
        n = A.get_node(lst[i])
        n.attr["color"] = "red"
        n.attr['label']='...'

    if lst[i] =="..":
        n = A.get_node(lst[i])
        n.attr["color"] = "lightgreen"
        n.attr["style"]="filled"
        n.attr['label']='...'
    
    if lst[i] in snyk_vulnerable_version_list[0] and lst[i] in our_vulnerable_version_list[0]:
        n = A.get_node(lst[i])
        n.attr["color"] = "lightgreen"
        n.attr["style"]="filled"
    if lst[i][0]=="." or lst[i+1][0]==".":
         A.add_edge(lst[i], lst[i+1])
    else:
        if lst[i][0]==lst[i+1][0]:        
            A.add_edge(lst[i], lst[i+1])
            if lst[i] in exclude_list:
                A.add_node(lst[i])
                n = A.get_node(lst[i])
                n.attr["height"] = .1
                n.attr["shape"] = "point"
                e = A.get_edge(lst[i], lst[i+1])
                e.attr['len']='.01'
                # n.attr['style']='invis'
                
        else:
            root_node_list.append(lst[i+1])

A.add_edge(root_node_list[0], root_node_list[1], color='blue')
A.add_edge(root_node_list[1], root_node_list[2], color='blue')

# print(root_node_list)
# A.add_node("Ground node", style="invis")
# B = A.add_subgraph(root_node_list, name="s1", rank="same")
# B.graph_attr["rank"] = "same"
# A.add_edge("s1", "Ground node")
# # save the graph in dot format
# A.write('test.dot')

# pygraphviz renders graphs in neato by default, 
# so you need to specify dot as the layout engine
# A.layout(prog='dot')
# A.draw("file.pdf")



