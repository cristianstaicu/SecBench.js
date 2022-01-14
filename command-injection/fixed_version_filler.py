from os import walk
import requests
from bs4 import BeautifulSoup

dirnames = next(walk('.'))[1]
for dirs in dirnames:
    print(dirs)
    if("node_modules" == str(dirs) or "jison_0.4.17" == str(dirs)):
        continue
    else:
        file_read = './'+dirs+'/package.json'
        dir_val = dirs.rsplit('_',1)[0]
        with open (file_read) as f1:
            lines = f1.readlines()
        flag =0
        f2 = open(file_read,'w')
        for line in lines:
            if ('"fixedVersion": "n/a"' in line):
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
                    flag =0
                    # print('line31')
                    for j in range (0,len(string_list)):
                        if ('Command Injection'.lower() in string_list[j].lower()):
                            val1 = string_list[j+6].strip()
                            # print('line35')
                            if(val1 != '*' and ('&lt;' in val1)):
                                val2 =val1.split('&lt;')[1]
                                line1 = line.replace('n/a', val2)
                                f2.write(line1)
                            else:
                                f2.write(line)
                            break
          
            else:
                f2.write(line)

f2.close()