import requests
import collections

f = open("DT_snyk.txt", "w")

for i in range (1,110):#number of pages present is 110 at the time of scrapping [nov 2021]
  URL = 'https://snyk.io/vuln/page/'+str(i)+'?type=npm'
  print('\npage :',i)
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)
  string_list= []
  string_list = to_parse.splitlines()
  for j in range (len(string_list)):
    if "directory traversal".lower() in string_list[j].lower() or "path traversal".lower() in string_list[j].lower():
      pack_name=string_list[j+2].strip()
      pack_name=pack_name.replace('</html>','')
      print(pack_name)

f.close()
