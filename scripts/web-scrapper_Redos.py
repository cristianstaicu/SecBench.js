#the packages scrapped are from snyk vulnerability database
import requests
import collections

f = open("ReDoS_snyk.txt", "w")


vuln =[]
for i in range (1,103):#number od pages present is 102 at the time [2021]
  URL = 'https://snyk.io/vuln/page/'+str(i)+'?type=npm'
  print('page ',i,': \n')
  page = requests.get(URL)
  from bs4 import BeautifulSoup
  soup = BeautifulSoup(page.content, 'html.parser')
  #print(soup)
  to_parse = str(soup)

  string_list= []
  string_list = to_parse.splitlines()
  proto_poll=[]

  p=0
  for i in range (len(string_list)):
    if "Regular Expression Denial of Service" in string_list[i]:
      #print(string_list[i].strip())
      p=1
    if "list-vulns__item__package__name" in string_list[i] and p == 1:#package which has prototype pollution
      #print(string_list[i+1].strip(),'\n')
      x=str(string_list[i+1].strip())
      #steps to extract the package name from html parameters
      x=x.split('>')[1]#extracts part of string to right of > in (eg:) resultant <a href="/vuln/npm:expand-hash">expand-hash</a> 
      x=x.split('<')[0]#extracts part of string to left of > from the string
      
      print(x)
      f.write(x)
      f.write('\n')
      p=0

f.close()
