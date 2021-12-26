from os import walk
import subprocess
import requests
from bs4 import BeautifulSoup
import math

dirnames = next(walk('.'))[1]
for dirs in dirnames:
    if("node_modules" == str(dirs)):
        continue
    else:
        file_read = './'+dirs+'/package.json'
        pack_string =[]
        with open (file_read) as f1:
            lines = f1.readlines()
        flag =0
        for line in lines:
            if ("SNYK-JS" in line):
                flag = 1
            pack_string.append(line)
        if(flag == 0):
            dir_val = dirs.rsplit('_',1)[0]
            URL = 'https://security.snyk.io/search?type=npm&q=' + str(dir_val)
            #print(URL)
            page = requests.get(URL)
            soup = BeautifulSoup(page.content, 'html.parser')
            to_parse = str(soup)
            if( "No results found" in to_parse):
                print("not found:",dir_val)
            else:
                string_list= []
                string_list = to_parse.splitlines()
                print(dir_val)
                #print(math.ceil(len(string_list)/2))
                for j in range(0,len(string_list)):
                    if("SNYK-JS".lower() in string_list[j].lower() and "prototype pollution".lower() in string_list[j+1].lower()):
                        #print("j+1-",string_list[j+1],'--------------')
                        #print("j-1-",string_list[j-1],'--------------')
                        source1=string_list[j].rsplit('href="',1)[1]
                        source1 = source1.replace('">','')
                        source1 = 'https://security.snyk.io/' + source1
                        #print(source1)
                        break
                write_file = open(file_read,"w")
                break_flag =0
                for k in range(0, len(pack_string)):
                    if("source" in pack_string[k] and '""'in pack_string[k] and break_flag ==0 ):
                        val1 = pack_string[k].split(':')[0]
                        if (',' in pack_string[k]):
                            to_write = val1 + ': "' + source1 +'",\n'
                        else:
                            to_write = val1 + ': "' + source1 +'"\n'
                        write_file.write(to_write)
                        #print(dirs, pack_string[k])
                        break_flag = 1
                    else:
                        write_file.write(pack_string[k])
    
