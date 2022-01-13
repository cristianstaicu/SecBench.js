import subprocess # this is done to run the system calls to make the directories
from os import walk

dirnames = next(walk('.'))[1]

for dirs in dirnames:
    if(dirs != 'node_modules'):
        filenames = next(walk('./'+ dirs), (None, None, []))[2]
        flag =0
        for files in filenames:
            if str(files).startswith('un-'):
                print(dirs)
                break
            elif('.test.js' in files):
                flag =1
                break
        if (flag == 0):
            subprocess.Popen(['mv','./' + dirs,'../incubator/'])#creating package.json in the subdirectory            
            print(dirs)
