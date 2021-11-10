import requests

f = open("Directory_Traversal.txt", "w")
proto_poll=[]
string_list= []
j =0
for i in range (1,86):# At the time[on 10th nov 2021] of scrapping this was 86 pages
  print("\npage: ",i)
  URL = 'https://github.com/advisories?page='+str(i)+'&query=ecosystem%3Anpm'#https://github.com/advisories?page=2&query=ecosystem%3Anpm
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)
  string_list=to_parse.splitlines()
  for j in range(0,len(string_list)):
    if "Directory Traversal".lower() in string_list[j].lower() or "Path Traversal".lower() in string_list[j].lower():
      print(string_list[j+13].strip())
      f.write(string_list[j+13].strip())
      f.write('\n')
f.close()