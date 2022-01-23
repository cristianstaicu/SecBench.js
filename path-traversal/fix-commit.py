from os import walk
import requests
from bs4 import BeautifulSoup

dirnames = next(walk('.'))[1]
for dirs in dirnames:
    print(dirs)
    if("node_modules" == str(dirs) or dirs == 'htmls' or dirs == 'config' or "statics" == dirs):
        continue
    else:
        file_read = './'+dirs+'/package.json'
        dir_val = dirs.rsplit('_',1)[0]
        with open (file_read) as f1:
            lines = f1.readlines()
        flag =0
        f2 = open(file_read,'w')
        for line in lines:
            if ('"fixCommit": "n/a"' in line):
                URL = 'https://security.snyk.io/search?type=npm&q=' + str(dir_val)
                # print(URL)
                page = requests.get(URL)
                soup = BeautifulSoup(page.content, 'html.parser')
                to_parse = str(soup)
                if( "No results found" in to_parse):
                    f2.write(line)
                    print("not found:",dir_val)
                else:
                    string_list= []
                    string_list = to_parse.splitlines()
                    # print('searching1')
                    # if(dirs == 'asciitable.js_1.0.2'):
                    #     print(len(string_list))
                    flag =0
                    for j in range (0,len(string_list)):
                        if ('path Traversal'.lower() in string_list[j].lower()):
                            # print('reaching')
                            val1 = str(string_list[j-1])
                            source1=val1.split('href="')
                            # print(len(source1),source1[-1])
                            # source1=val1.split('href="')[1]
                            source2 = source1[1].replace('">','')
                            URL1 = 'https://security.snyk.io/' + source2
                            page1 = requests.get(URL1)
                            soup1 = BeautifulSoup(page1.content, 'html.parser')
                            to_parse1 = str(soup1)
                            string_list1= []
                            string_list1 = to_parse1.splitlines()
                            cve=0
                            comm=''
                            for k in range (len(string_list1)):
                                if '[GitHub Commit]'.lower() in string_list1[k].lower():
                                    # print('reaching', dirs)
                                    val3= string_list1[k].split('semver')[0]
                                    # print(val3)
                                    if('Github Commit' in val3):
                                        val4 = val3.split('Github Commit](')[1]
                                    elif('GitHub Commit' in val3):
                                        val4 = val3.split('GitHub Commit](')[1]
                                    # print(val4)
                                    val5= val4.split(')')[0]
                                    comm =val5.replace('\\u002F','/')
                                    # comm = val3.split('"')[0]
                                    print(dirs,'yes')
                                    cve=1
                                    break
                            if(cve == 1):
                                line1 = line.replace('n/a',comm)
                                f2.write(line1)
                                flag =1
                                break
                            else:
                                f2.write(line)
                                break


                    # if (flag == 0):
                    #     f2.write(line)
                    #     break

            else:
                f2.write(line)

f2.close()