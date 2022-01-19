from os import walk

with open('package.json') as f1:
    lines = f1.readlines()
dirnames = next(walk('.'))[1]
# for dirs in dirnames:
#     flag =0
#     for line in lines:
#         if(dirs in line):
#             flag =1
#             break
#     if(flag == 0):
#         print(dirs)

for line in lines:
    flag =0
    # print(line,end ='')
    if("dependencies" in line or '{' in line or '}' in line):
        continue
    else:
        val = line.split('"')[1]
        for dirs in dirnames:
            if(val == dirs):
                flag =1
                break
        if(flag == 0):
            print(val)