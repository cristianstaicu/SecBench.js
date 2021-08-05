#this code scraps: https://www.npmjs.com/advisories website(81 pages as of June 2021) and collects all the vulnerablites present in them.

import requests
import collections

vuln =[]
for i in range (0,81):
  URL = 'https://www.npmjs.com/advisories?page='+str(i)+'&perPage=20'
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  #print(soup)
  results = soup.find(id='app')
  x=results.prettify()

  to_parse=str(x)

  string_list= []
  string_list = to_parse.splitlines()
  
  p=0
  for i in range (len(string_list)):
    if "advisories" in string_list[i]:
      #print(string_list[i+1].strip())
      str_vuln=str(string_list[i+1].strip())
      vuln.append(str_vuln)
        
  #print('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')

frequency = dict(collections.Counter(vuln))

for k in frequency.keys():
   print (k, frequency[k])

