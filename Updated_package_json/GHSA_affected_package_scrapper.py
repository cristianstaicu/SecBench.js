#Note: This is a priliminary script that gets affected versions of the packages! A manual inscpection has to be further done to remove unnecessary details! :)
# The ones with <= or >= can be misleading! Please do a manual check for those packages!
import requests
from bs4 import BeautifulSoup

f = open("Directory_Traversal.txt", "w")
link_list=[]
string_list= []
j =0
for i in range (1,86):#at the time of scrapping its 86
  #print("\npage: ",i)
  URL = 'https://github.com/advisories?page='+str(i)+'&query=ecosystem%3Anpm'#https://github.com/advisories?page=2&query=ecosystem%3Anpm
  page = requests.get(URL)
  soup = BeautifulSoup(page.content, 'html.parser')
  to_parse = str(soup)
  string_list=to_parse.splitlines()
  for j in range(0,len(string_list)):
    if "Directory Traversal".lower() in string_list[j].lower() or "Path Traversal".lower() in string_list[j].lower():
      link1 = string_list[j-1].strip()#we get the ghsa id which will be again used to go to the website were we get the affected version!
      link = link1.split('href="')[1]
      link = link.replace('">','')
      site = "https://github.com" +str(link)
      page1 = requests.get(site)
      soup1 = BeautifulSoup(page1.content, 'html.parser')
      #print(soup)
      to_parse1 = str(soup1)
      string_list1=to_parse1.splitlines()
      for k in range(0,len(string_list1)):
        if "Affected versions".lower() in string_list1[k].lower():
          val1= string_list1[k+1].split('>')[1]
          val2 = val1.replace('</div', '')# removing unnecessary stuff
          val3 = val2.replace('&gt;','>')# converting to actual symbols '>', '<'
          version_aff = val3.replace('&lt;','<')
          print('"', string_list[j+13].strip(),'": "',version_aff.strip(), '",')

f.close()