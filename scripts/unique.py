#Dated September 2nd 2021 
import requests

vuln_npm=[]
vuln_snyk=[]

for i in range (0,81):
  URL = 'https://www.npmjs.com/advisories?page='+str(i)+'&perPage=20'
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  #print(soup)
  results = soup.find(id='app')
  x=results.prettify()

  #print(x)
  to_parse=str(x)

  string_list= []
  string_list = to_parse.splitlines()
  p=0
  length1=0
  for i in string_list:
    length1 = length1 + 1 #finding the length to be parsed
  for i in range (length1):
    if "Command Injection" in string_list[i]:
      #print(string_list[i].strip())
      p=1
    if "_530f1ba4 fw6 mb2" in string_list[i] and p == 1:#package which has prototype pollution
      #print(string_list[i+1].strip(),'\n')
      wri=str(string_list[i+1].strip())+'\n'
      vuln_npm.append(string_list[i+1].strip())
      p=0

for i in range (1,103):#number od pages present is 102 at the time [2021]
  URL = 'https://snyk.io/vuln/page/'+str(i)+'?type=npm'
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)

  string_list= []
  string_list = to_parse.splitlines()
  length2=0
  for i in string_list:
    length2 = length2 + 1
  p=0
  for i in range (length2):
    if "Command Injection" in string_list[i]:
      p=1
    if "list-vulns__item__package__name" in string_list[i] and p == 1:#package which has prototype pollution
      x=str(string_list[i+1].strip())
      #steps to extract the package name from html parameters
      x=x.split('>')[1]#extracts part of string to right of > in (eg:) resultant <a href="/vuln/npm:expand-hash">expand-hash</a> 
      x=x.split('<')[0]#extracts part of string to left of > from the string
      vuln_snyk.append(x)
      #print(x)
      p=0


snyk = np.array(vuln_snyk)
print(snyk.size)

npm = np.array(vuln_npm)
print(npm.size)

total_list3 =[]
total_list3 =vuln_snyk + vuln_npm#concatenating two list got from the snk and  npm advisory 
uniq1 = np.array(total_list3)
uniq=np.unique(uniq1)
print("unique no of packages for the vulnerability is ",uniq.size)