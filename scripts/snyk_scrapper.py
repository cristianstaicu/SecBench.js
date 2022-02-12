import requests
import collections


snyk_vuln= []
f = open("DT_snyk.txt", "w")
count = 0
for i in range (2,115):#number od pages present is 102 at the time [2021]
  if(i == 83):
    i=i+1
  URL = 'https://snyk.io/vuln/page/'+str(i)+'?type=npm'
  print('\npage :',i)
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)
  string_list= []
  string_list = to_parse.splitlines()
  for j in range (len(string_list)):
    if "Improper Input Validation".lower() in string_list[j].lower():# or "remote code execution".lower() in string_list[j].lower():# or "Arbitrary code Injection".lower() in string_list[j].lower():
      pack_name=string_list[j+2].strip()
      pack_name=pack_name.replace('</html>','')
      print(pack_name)
      snyk_vuln.append(pack_name)
      count+=1

f.close()
print(count)
