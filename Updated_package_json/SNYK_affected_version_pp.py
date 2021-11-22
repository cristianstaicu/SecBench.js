import requests
import re

def containsNumber(value):
    return bool(re.findall('[0-9]+', value))
#f = open("DT_snyk.txt", "w")
count_with_updated_version = 0
count_without_updated_version = 0

package=[]
for i in range (1,110):#number od pages present is 110 at the time [2021]
  URL = 'https://snyk.io/vuln/page/'+str(i)+'?type=npm'
  #print('\npage :',i)
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)
  string_list= []
  string_list = to_parse.splitlines()
  for j in range (len(string_list)):
    if "Prototype pollution".lower() in string_list[j].lower():#or "path traversal".lower() in string_list[j].lower():
      pack_name=string_list[j+2].strip()
      pack_name=pack_name.replace('</html>','')
      pack_name = pack_name.replace('/','\\u002F')
      #print(pack_name)
      package.append(pack_name)
      if("body" in string_list[j+1]):
        #print(package)
        package.pop()
        #print(package)
        mesh1 = string_list[j]
        mesh2=[]
        mesh2=mesh1.split(',')
        for l in range(0,len(package)):
          for k in range (0,len(mesh2)):
            #print(mesh2[k])
            if package[l].lower() in mesh2[k].lower(): #"Directory Traversal".lower() in mesh2[k].lower():
              #print("Hello world!",'pack_name: ',package[l], 'xxx',mesh2[k])
              if "\\u002F" in package[l]:
                #print(mesh2[k+3])
                versions = mesh2[k+3].split('"')
                #print("##",versions)
                if(1 > len(versions)):
                  ver1 = versions[1].replace("\\u003E",'>')
                  ver1 = versions[1].replace("\\u003C",'<')
                else:
                  ver1 = versions[0].replace("\\u003E",'>')
                  ver1 = versions[0].replace("\\u003C",'<')
                  ver1 = versions[0].replace("semver:[",'')
                #print(ver1)
                version = ver1.replace("\\u003C",'<')
                print('"',package[l],'": "',version,'",')
              else:
                #val.replace('{packageName','')
                #mesh2[k+1] = mesh2[k+1].split("semver")[1]
                mesh2[k+1] = mesh2[k+1].replace('\\u003C','<')
                mesh2[k+1] = mesh2[k+1].replace('\\u003E','>')
                flag = 0
                version_str1=''
                for m in range (0,len(mesh2[k+1])):
                  if(mesh2[k+1][m] == '['):
                    flag =1
                    
                    print('"',package[l],'": ',end ='')
                  elif(mesh2[k+1][m] == ']'):
                    flag =0
                    print(',')
                  elif(flag == 1):
                    print(mesh2[k+1][m], end ='')
                    version_str1 +=mesh2[k+1][m]
                
        package = []