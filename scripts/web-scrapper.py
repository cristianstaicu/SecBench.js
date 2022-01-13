import requests

f = open("prototype_pollutions_npm.txt", "w")

for i in range (0,81):#total number od pages = 81 so change the number accordingly
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
  proto_poll=[]

  p=0
  for i in range (len(string_list)):
    if "Prototype Pollution" in string_list[i]:
      #print(string_list[i].strip())
      p=1
    if "_530f1ba4 fw6 mb2" in string_list[i] and p == 1:#package which has prototype pollution and _530f1ba4 fw6 mb2 is the div id in the html page
      print(string_list[i+1].strip(),'\n')
      wri=str(string_list[i+1].strip())+'\n'
      f.write(wri)
      proto_poll.append(string_list[i+1].strip())
      p=0
  #print('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
f.close()