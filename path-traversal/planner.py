#The purpose of the script is to create folders as presented in the package.json
import subprocess # this is done to run the system calls to make the directories
import os
import time
with open('package.json') as f:
    lines = f.readlines()

path = os.walk(".")
flag = 0
for line in lines:
    line.lstrip()
    line.rstrip()
    if (flag == 1 and '}' not in line):
        directory_1=line.split(':')[0]# to seperate package part from version
        directory_1=line.split('"')[1]# removing thr '"'
        translation_table = dict.fromkeys(map(ord, '/'), '-')#
        directory_1 = directory_1.translate(translation_table)
        directory_1.strip()
        #print('aaa',directory_1)
        subprocess.Popen(['mkdir',directory_1])#creates the directories.
        file_created = './' + str(directory_1) +'/package.json'# framing the argument for the touch command 
        subprocess.Popen(['touch',file_created])#creating package.json in the subdirectory
        time.sleep(1.5)
        with open(file_created,"w") as f1:
            f1.write("{\n")
            f1.write("\t\"dependencies\": {\n")
            out = directory_1.rsplit('_')
            #print(file_created,out)
            package_name = directory_1.rsplit('_')[0]
            #print(package_name)
            package_version = directory_1.rsplit('_')[1]
            #print(package_name)
            f1.write('\t"'+ package_name+'":')# writing package name
            f1.write(' "'+ package_version + '"\n\t}\n')# writing the version number
            f1.write('}')
            

    if("dependencies" in line):
        flag = 1
        print("flag set!")