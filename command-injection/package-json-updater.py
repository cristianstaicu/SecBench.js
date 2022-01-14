from os import walk
import subprocess

dirnames = next(walk('.'))[1]
for dirs in dirnames:
    if(dirs == 'node_modules' or dirs == 'jison_0.4.17'):
        continue
    else:
        strdir = './'+dirs+'/package.json'
        with open(strdir) as f:
            lines = f.readlines()
        string_list= []
    # string_list = lines.splitlines()
        for i in range(0,len(lines)):
            if(i == 1 or i==2 or i==3):
                strline = str(lines[i])
                string_list.append(strline)
            if(i == 2):
                print(lines[i])
        
        strdir1 = './'+dirs+'/Package.json'
        f1 = open(strdir, "w")
        f1.write('{\n')
        f1.write('\t"id": "",\n')
        f1.write(string_list[0])
        f1.write(string_list[1])
        f1.write('\t},\n')
        f1.write('\t"links": {\n')
        f1.write('\t\t"source1": "",\n')
        f1.write('\t\t"source2": ""\n')
        f1.write('\t},\n')
        f1.write('\t"fixedVersion": "n/a",\n')
        f1.write('\t"fixCommit": "n/a",\n')
        f1.write('\t"sink": ""\n')
        f1.write('}')
        f1.close()
#print(string_list)
