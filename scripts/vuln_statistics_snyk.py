import requests
import collections

vuln =[]
for i in range (1,105):
  URL = 'https://snyk.io/vuln/page/'+str(i)+'?type=npm'
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  #print(soup)
  to_parse=str(soup)

  string_list= []
  string_list = to_parse.splitlines()
  
  p=0
  for i in range (len(string_list)):
    if "SNYK-JS" in string_list[i]:
      #print(string_list[i+1])
      y=string_list[i+1].split('<')[1]
      z=y.split('>')[1];
      str_vuln = z.strip();
      vuln.append(str_vuln)
#       #print(string_list[i+1].strip())
#       str_vuln=str(string_list[i+1].strip())
#       vuln.append(str_vuln)
        
#   #print('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')

frequency = dict(collections.Counter(vuln))

for k in frequency.keys():
   print (k, frequency[k])

