done_list=[]
import glob
import os
import requests
import collections
from bs4 import BeautifulSoup
import traceback
import json

lst =  glob.glob("/Users/masudulhasanmasudbhuiyan/Music/vulns4js/prototype-pollution/*")
for folder in lst:
    if os.path.isdir(folder):
        index = folder.rfind("/")
        folder_name_with_version = folder[index+1:]
        underscore_index = folder_name_with_version.rfind("_")
        folder_name = folder_name_with_version[:underscore_index]
        # print(folder_name)
        done_list.append(folder_name)
# print(len(done_list))

line_list=[]
with open("/Users/masudulhasanmasudbhuiyan/Music/vulns4js/Vulnerable-packages/pp-snyk.txt") as in_file:
    for line in in_file:
        line_list.append(line)

page_dict = dict()
for i in range(len(line_list)):
    if "page" in line_list[i]:
        # print(line_list[i])
        parts = line_list[i].split(":")
        key = int(parts[1])
        # print(key)
        # package_list.setdefault(ke, []).append(val)
        y=i+1
        while(len(line_list[y].strip())>0):
            # print(line_list[y])
            if not line_list[y].strip().isnumeric():
                page_dict.setdefault(key, []).append(line_list[y].strip())
            y+=1


def get_package():
    for key in page_dict:
        if key%2==0 and key>=20:
            package_list = page_dict[key]
            # print(package_list)

            for package in package_list:
                if package not in done_list:
                    print(package)
                    try:
                        URL = 'https://security.snyk.io/search?q='+str(package)+'&type=npm'
                        page = requests.get(URL)

                        soup = BeautifulSoup(page.content, 'html.parser')
                        # print(soup.find('div', {'class' :'vue--table__tbody'}).text)

                        for item in soup.select('.vue--table__row'):
                            all_links = item.find("a", href=True)
                            # print(type(all_links))
                            if all_links is not None:
                                if "Prototype Pollution" in all_links.text:
                                    # print(all_links.text)
                                    details_url = "https://security.snyk.io/"+all_links.get("href")
                                    print(details_url)

                                    details_page = requests.get(details_url)

                                    details_soup = BeautifulSoup(details_page.content, 'html.parser')
                                    spans=details_soup.find_all('span',"subheading")
                                    for list_item in spans:
                                        version_txt = list_item.find("strong")
                                        vulnerable_version = version_txt.text.strip()
                                        # print(vulnerable_version)

                                        links_in_span = list_item.find("a", href=True)
                                        actual_package_name = links_in_span.text.split(" ")[0].strip()
                                        print("Actual ", actual_package_name)
                                        package_version_url = links_in_span.get("href")
                                        # print(package_version_url)

                                        index = vulnerable_version.rfind("<")
                                        # print("index", index)
                                        fixed_version="n/a"
                                        if index != -1:
                                            fixed_version = vulnerable_version.strip()[index+1:]
                                            print("Fixed version ", fixed_version)

                                            package_version_page = requests.get(package_version_url)
                                            package_version_soup = BeautifulSoup(package_version_page.content, 'html.parser')

                                            lsts = package_version_soup.select('.table--comfortable')
                                            links_in_table = lsts[1].find_all("a", href=True, class_="u--d__if u-margin-right--sm")
                                            # print(links_in_table)

                                            version_list=[]
                                            for link in links_in_table:
                                                # print("Text", link.text)
                                                # print()
                                                version_list.append(link.text)

                                            # print("Length ", len(version_list))

                                            k=0
                                            while(k< len(version_list)-1):
                                                version_number = version_list[k].split(" ")[1].strip()
                                                # print(version_number)
                                                if version_number == fixed_version.strip():
                                                    break
                                                k+=1
                                            
                                            if (k<len(version_list)-1):
                                                vulnerable_version_number = version_list[k+1].split(" ")[1].strip()
                                                print("Vulnerable ", vulnerable_version_number)
                                        else:
                                            print("Vulnerable version ", vulnerable_version)

                                            if "*" in vulnerable_version:
                                                package_version_page = requests.get(package_version_url)
                                                package_version_soup = BeautifulSoup(package_version_page.content, 'html.parser')

                                                lsts = package_version_soup.select('.table--comfortable')
                                                links_in_table = lsts[1].find_all("a", href=True, class_="u--d__if u-margin-right--sm")
                                                # print(links_in_table)

                                                version_list=[]
                                                for link in links_in_table:
                                                    version_list.append(link.text)

                                                vulnerable_version_number = version_list[0].split(" ")[1].strip()
                                                print("Vulnerable ", vulnerable_version_number)


                                    
                                    spans=details_soup.find_all('span',"cve")
                                    cve_txt=""
                                    cve_number = ""
                                    for list_item in spans:
                                        cve_txt = list_item.find("a", href=True)
                                        # print("cve",cve_txt.get("id"))
                                        cve_number = str(cve_txt.get("id"))


                                    print()

                                    github_url = "n/a"

                                    commit_index = str(details_page.text).find('GitHub Commit')
                                    if commit_index != -1:
                                        # print("commit ", commit_index)

                                        index_of_braket = str(details_page.text).index("]", commit_index)
                                        # print("bracket", index_of_braket)
                                        end_index = str(details_page.text).index("\\n", commit_index)
                                        # print("end ", end_index)
                                        from urllib.parse import quote_plus
                                        github_url = str(details_page.text)[index_of_braket+2:end_index-1]
                                        from urllib.parse import unquote
                                        # url = unquote(url)
                                        # print("github ", github_url)

                                        github_url =  github_url.replace("\\/", "/").encode().decode('unicode_escape')



                                    # links=details_soup.find_all("a", href=True)
                                    # print(len(links))
                                    # for link in links:
                                    #     print(link.text)
                                    #     if link.text == "GitHub Commit":
                                    #         print(link)
                                    

                                    d = {"id": cve_number,
                                        "dependencies":{actual_package_name:vulnerable_version_number},
                                        "link":{
                                            "source1":details_url
                                        },
                                        "fixedVersion":fixed_version,
                                        "fixCommit": github_url,
                                        "sink": ""
                                        }
                                    j = json.dumps(d, indent=4)
                                    # print(j)

                                    package_name = str(actual_package_name).replace("/","-").replace("@","")
                                    folder_name = package_name+"_"+vulnerable_version_number
                                    print("folder_name", folder_name)
                                    path = "prototype-pollution/"+folder_name+"/"
                                    try: 
                                        os.mkdir(path)
                                        with open(path+'package.json', 'w', encoding='utf-8') as f:
                                            json.dump(d, f, ensure_ascii=False, indent=4) 
                                    except OSError as error: 
                                        print(error)

                                    codeblocks= str(details_page.text).find('PoC')
                                    if codeblocks!=-1:
                                        start_index = details_page.text.find('```', codeblocks)
                                        end_index = details_page.text.find('```', start_index+1)

                                        # print("code ", codeblocks)
                                        # print("start ", start_index)
                                        # print("end ", end_index)

                                        if start_index !=-1 and end_index != -1:
                                            code = details_page.text[start_index+1:end_index].replace("\\/", "/").encode().decode('unicode_escape')
                                            try: 
                                                out_file = open(path+package_name+".test.js", "a+")
                                                out_file.write("//"+details_url+"\n")
                                                out_file.write("test(\"prototype pollution in"+actual_package_name+ "\", () => { \n expect({}.polluted).toBe(undefined);\n expect({}.polluted).toBe(\"yes\"); \n});")
                                                
                                                out_file.write(code)
                                            except OSError as error: 
                                                print(error)
                                            


                                     
                                    # break
                    except:
                        traceback.print_exc()
                # break
    # break
                



# out_file = open("test.txt","a+")


get_package()
# package = "handlebars"
# URL = 'https://security.snyk.io/search?q='+str(package)+'&type=npm'
# page = requests.get(URL)
# soup = BeautifulSoup(page.content, 'html.parser')

# for item in soup.select('.vue--table__row'):
#     all_links = item.find("a", href=True)
#     if all_links is not None:
#         if "Prototype Pollution" in all_links.text:
#             details_url = "https://security.snyk.io/"+all_links.get("href")
#             print(details_url)
#             details_page = requests.get(details_url)
#             details_soup = BeautifulSoup(details_page.content, 'html.parser')
#             spans=details_soup.find_all('span',"subheading")
#             for list_item in spans:
#                 version_txt = list_item.find("strong")
#                 vulnerable_version = version_txt.text.strip()
#                 # print(vulnerable_version)
#                 links_in_span = list_item.find("a", href=True)
#                 actual_package_name = links_in_span.text.split(" ")[0].strip()
#                 print("Actual ", actual_package_name)
#                 package_version_url = links_in_span.get("href")
#                 # print(package_version_url)
#                 index = vulnerable_version.rfind("<")
#                 fixed_version="n/a"
#                 if index != -1:
#                     fixed_version = vulnerable_version.strip()[index+1:]
#                     print("Fixed version ", fixed_version)
#                     package_version_page = requests.get(package_version_url)
#                     package_version_soup = BeautifulSoup(package_version_page.content, 'html.parser')
#                     lsts = package_version_soup.select('.table--comfortable')
#                     links_in_table = lsts[1].find_all("a", href=True, class_="u--d__if u-margin-right--sm")
#                     # print(links_in_table)
#                     version_list=[]
#                     for link in links_in_table:
#                         version_list.append(link.text)
#                     k=0
#                     while(k< len(version_list)-1):
#                         version_number = version_list[k].split(" ")[1].strip()
#                         if version_number == fixed_version.strip():
#                             break
#                         k+=1
                    
#                     if (k<len(version_list)-1):
#                         vulnerable_version_number = version_list[k+1].split(" ")[1].strip()
#                         print("Vulnerable ", vulnerable_version_number)
#                 else:
#                     print("Vulnerable version ", vulnerable_version)

#                     if "*" in vulnerable_version:
#                         package_version_page = requests.get(package_version_url)
#                         package_version_soup = BeautifulSoup(package_version_page.content, 'html.parser')

#                         lsts = package_version_soup.select('.table--comfortable')
#                         links_in_table = lsts[1].find_all("a", href=True, class_="u--d__if u-margin-right--sm")
#                         version_list=[]
#                         for link in links_in_table:
#                             version_list.append(link.text)

#                         vulnerable_version_number = version_list[0].split(" ")[1].strip()
#                         print("Vulnerable ", vulnerable_version_number)


            
#             spans=details_soup.find_all('span',"cve")
#             cve_txt=""
#             cve_number = ""
#             for list_item in spans:
#                 cve_txt = list_item.find("a", href=True)
#                 cve_number = str(cve_txt.get("id"))


#             print()

#             github_url = "n/a"

#             commit_index = str(details_page.text).find('GitHub Commit')
#             if commit_index != -1:
#                 index_of_braket = str(details_page.text).index("]", commit_index)
#                 end_index = str(details_page.text).index("\\n", commit_index)
#                 from urllib.parse import quote_plus
#                 github_url = str(details_page.text)[index_of_braket+2:end_index-1]
#                 from urllib.parse import unquote
#                 github_url =  github_url.replace("\\/", "/").encode().decode('unicode_escape')

#             d = {"id": cve_number,
#                 "dependencies":{package:vulnerable_version_number},
#                 "link":{
#                     "source1":details_url
#                 },
#                 "fixedVersion":fixed_version,
#                 "fixCommit": github_url,
#                 "sink": ""
#                 }
#             j = json.dumps(d, indent=4)
#             print(j)

            # package_name = str(package).replace("/","-").replace("@","")
            # folder_name = package_name+"_"+vulnerable_version_number
            # print("folder_name", folder_name)
            # path = "prototype-pollution/"+folder_name+"/"
            # try: 
            #     os.mkdir(path)
            #     with open(path+'package.json', 'w', encoding='utf-8') as f:
            #         json.dump(d, f, ensure_ascii=False, indent=4) 
            # except OSError as error: 
            #     print(error)