import requests

ga_vuln = []
f = open("Directory_Traversal.txt", "w")
proto_poll=[]
string_list= []
j =0
count_1 = 0
for i in range (1,91):#at the time 
  print("\npage: ",i)
  URL = 'https://github.com/advisories?page='+str(i)+'&query=ecosystem%3Anpm'#https://github.com/advisories?page=2&query=ecosystem%3Anpm
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)
  string_list=to_parse.splitlines()
  for j in range(0,len(string_list)):
    if "Download Resources over".lower() in string_list[j].lower():# and "Regular Expression Denial of Service".lower() not in string_list[j].lower():# or "Arbitrary Code Execution".lower() in string_list[j].lower():
      print(string_list[j+13].strip())
      count_1+=1
      ga_vuln.append(string_list[j+13].strip())
      f.write(string_list[j+13].strip())
      f.write('\n')
f.close()
print(count_1)
